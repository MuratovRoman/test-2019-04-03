$('.js-form').on('submit', e => {
  e.preventDefault();
  const form = $(e.currentTarget);
  if(formValidation(form)) {
    $('.js-email-parent, .js-password-parent').removeClass('valid');
    const urlPhpFile = './form.php';
    
    $.ajax({
      url: urlPhpFile,
      type: 'POST',
      dataType: 'html',
      data: $(e.currentTarget).serialize(),
      success() {
        form.get(0).reset();
        var sentMessage = $('.js-success');
        sentMessage.addClass('is-open');
        // sentMessage.fadeIn(300);
      },
      error: function(jqXHR, ajaxSettings, thrownError) {
        var errorSent = $('.js-error');
        var errorBlock = errorSent.find('.js-error-block');
        errorSent.addClass('is-open');
        form.get(0).reset();
        // errorSent.fadeIn(300);
        // var closeBtn =
        //     '<button class="message-sending__x js-close">&#10006;</button>';
  
        if (jqXHR.status === 0) {
          errorBlock.html('Not connect.\n Verify Network.');
        } else if (jqXHR.status === 404) {
          errorBlock.html('Requested page not found. 404');
        } else if (jqXHR.status === 500) {
          errorBlock.html('Internal Server Error 500.');
        } else if (exception === 'parsererror') {
          errorBlock.html('Requested JSON parse failed.');
        } else if (exception === 'timeout') {
          errorBlock.html('Превышено время отправки сообщения');
        } else if (exception === 'abort') {
          errorBlock.html('Ajax request aborted.');
        } else {
          // errorBlock.html('Uncaught Error.\n' + jqXHR.responseText);
        }
      }
    });
  }
});

$('.js-email').on('keyup', function() {
  emailValidation($(this));
});
$('.js-password').on('keyup', function() {
  passwordValidation($(this));
});

$('.js-checkbox').on('click', function() {
  checkboxValidation(this);
});

function formValidation(form) {
//   form.preventDefault();
  const email = $(form).find('.js-email');
  const password = $(form).find('.js-password');
  const checkbox = $(form).find('.js-checkbox');
  //   emailValidation(email);
  //   passwordValidation(password);
  //   checkboxValidation(checkbox);
  if(emailValidation(email) && passwordValidation(password) && checkboxValidation(checkbox)) {
    return true;
  } else {
    return false;
  }
}


function emailValidation(el) {
  const emailParent = $(el).parents('.js-email-parent');
  let error = emailParent.find('.js-error');
  const email = el[0].value;
  const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if(!email) {
    error.html('обязательное поле');
    emailParent.addClass('not-valid');
    return false;
  } else {
    if(!filter.test(email)) {
      error.html('некорректный адрес');
      emailParent.addClass('not-valid');
      return false;
    } else {
      error.html('');
      emailParent.removeClass('not-valid').addClass('valid');
      return true;
    }
  }
}

function passwordValidation(el) {
  const passwordParent = $(el).parents('.js-password-parent');
  let error = passwordParent.find('.js-error');
  const password = el[0].value;
  const filter = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{8,}$/;
  if(!password) {
    error.html('обязательное поле');
    passwordParent.addClass('not-valid');
    return false;
  } else {
    if(!filter.test(password)) {
      error.html('только латиница, минимум 8 символов, одна большая буква и одна цыфра');
      passwordParent.addClass('not-valid');
      return false;
    } else {
      error.html('');
      passwordParent.removeClass('not-valid').addClass('valid');
      return true;
    }
  }
}

function checkboxValidation(checkbox) {
  const input = $(checkbox).find('input');
  if(input.prop('checked')) {
    $(checkbox).removeClass('not-valid');
    return true;
  } else {
    $(checkbox).addClass('not-valid');
    return false;
  }
}


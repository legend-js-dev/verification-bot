const body = document.querySelector('body'),
	navbar = document.querySelector('.navbar'),
	menuBtn = document.querySelector('.menu-btn'),
	cancelBtn = document.querySelector('.cancel-btn');

menuBtn.onclick = () => {
	navbar.classList.add('show');
	menuBtn.classList.add('hide');
	body.classList.add('disabled');
};

cancelBtn.onclick = () => {
	body.classList.remove('disabled');
	navbar.classList.remove('show');
	menuBtn.classList.remove('hide');
};

window.onscroll = () => {
	this.scrollY > 20
		? navbar.classList.add('sticky')
		: navbar.classList.remove('sticky');
};

function Submit(token) {
    document.getElementById('captcha').submit();
  }

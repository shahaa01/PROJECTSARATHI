// electrician.js

document.querySelector('.booking-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Here you can add your booking submission logic,
    // for example, sending the data to your server or showing a confirmation message.
    alert('Thank you! Your electrician booking has been received.');
    this.reset();
  });
  
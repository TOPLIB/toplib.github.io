var selectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Локальный часовой пояс

function updateCountdown() {
    var now = new Date();
    var nextYear = now.getFullYear() + 1;
    var countDownDate = new Date(`January 01, ${nextYear} 00:00:00`);

    var options = {
        timeZone: selectedTimezone,
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false
    };
    var formatter = new Intl.DateTimeFormat([], options);
    var parts = formatter.formatToParts(countDownDate);
    var timeParts = {};

    parts.forEach(function(part) {
        if (part.type.startsWith('literal')) {
            return;
        }
        timeParts[part.type] = part.value;
    });

    var selectedCountDownDate = new Date(
        timeParts.year,
        timeParts.month - 1,
        timeParts.day,
        timeParts.hour,
        timeParts.minute,
        timeParts.second
    );

    var selectedNow = new Date();
    var selectedDistance = selectedCountDownDate - selectedNow;

    var selectedDays = Math.floor(selectedDistance / (1000 * 60 * 60 * 24));
    var selectedHours = Math.floor((selectedDistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var selectedMinutes = Math.floor((selectedDistance % (1000 * 60 * 60)) / (1000 * 60));
    var selectedSeconds = Math.floor((selectedDistance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = selectedDays;
    document.getElementById("hours").innerHTML = selectedHours;
    document.getElementById("minutes").innerHTML = selectedMinutes;
    document.getElementById("seconds").innerHTML = selectedSeconds;
    document.getElementById("year").innerHTML = nextYear;
}

var x = setInterval(updateCountdown, 1000);

document.getElementById('citySearch').addEventListener('input', function() {
    var filter = this.value.toLowerCase();
    var cityList = document.getElementById('cityList');
    var cities = cityList.getElementsByTagName('a');

    for (var i = 0; i < cities.length; i++) {
        var city = cities[i];
        if (city.innerHTML.toLowerCase().indexOf(filter) > -1) {
            city.style.display = "";
        } else {
            city.style.display = "none";
        }
    }
});

document.querySelectorAll('#cityList a').forEach(function(city) {
    city.addEventListener('click', function(event) {
        event.preventDefault();
        selectedTimezone = this.getAttribute('data-timezone');
        updateCountdown();
    });
});
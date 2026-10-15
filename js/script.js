// Get the CSV file as text
fetch('data/courses.csv')
  // Turn the response into text
  .then(function (res) { return res.text(); })
  // Use the text to fill the table and the meter
  .then(function (text) {
    // Split into lines, skip the header line
    var lines = text.trim().split('\n').slice(1);
    // Empty HTML string for the table rows
    var html = '';
    // Total passed EC for the meter
    var obtained = 0;

    // One row per CSV line
    for (var i = 0; i < lines.length; i++) {
      // Split the line into columns
      var parts = lines[i].split(',');
      // Grade of this row
      var grade = parts[4].trim();
      // Default row look is pending (grey)
      var cls = 'pending';

      // Passed means grade 5.5+, count its EC (green row)
      if (Number(grade) >= 5.5) {
        obtained += Number(parts[2]);
        cls = 'pass';
      // Any other filled-in grade means failed (red row)
      } else if (grade !== 'Pending' && grade !== '') {
        cls = 'fail';
      }

      // Plain row, one cell per column, class colors it
      html += '<tr class="' + cls + '"><td>' + parts.join('</td><td>') + '</td></tr>';
    }

    // Put the rows in the table
    document.getElementById('course_table_body').innerHTML = html;
    // Meter percent of 60 EC
    var percent = Math.round(obtained / 60 * 100);
    // Fill the bar (the bar itself is HTML/CSS)
    document.getElementById('meter_fill').style.width = percent + '%';
    // Numbers under the bar
    document.getElementById('ec_obtained').textContent = obtained;
    document.getElementById('ec_percent').textContent = percent + '%';
    document.getElementById('bsa_message').textContent = obtained >= 45 ? 'BSA Reached (>= 45 EC)' : (45 - obtained) + ' EC needed for BSA';
  });

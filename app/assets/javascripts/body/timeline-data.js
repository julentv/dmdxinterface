google.load("visualization", "1");

        // Set callback to run when API is loaded
        google.setOnLoadCallback(drawVisualization);

        // Called when the Visualization API is loaded.
        function drawVisualization() {
            // Create and populate a data table.
            var data = new google.visualization.DataTable();
            data.addColumn('datetime', 'start');
            data.addColumn('datetime', 'end');
            data.addColumn('string', 'content');

            var t = new Date(2010,7,23,16,30,15);
            var te = new Date(2010,7,23,16,30,16);

            data.addRows([
                [new Date(t.getTime()+0), new Date(t.getTime()+5), 'Traject A'],
                [new Date(t.getTime()+8), , 'Memo<br>' +
                        '<img src="/assets/timeline/notes-edit-icon.png" style="width:48px; height:48px;">'],
                [new Date(t.getTime()+9), , 'Phone call<br>' +
                        '<img src="/assets/timeline/Hardware-Mobile-Phone-icon.png" style="width:32px; height:32px;">'],
                [new Date(t.getTime()+4), new Date(t.getTime()+10), 'Traject B'],
            ]);

            // specify options
            var options = {
                width:  "100%",
                height: "300px",
                editable: false,
                style: "box",
                intervalMax: 100,
                min: t,
                max: te
            };

            // Instantiate our timeline object.
            var vis = new links.Timeline(document.getElementById('mytimeline'));

            // Draw our timeline with the created data and options
            vis.draw(data, options);
        }
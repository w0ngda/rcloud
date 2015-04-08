RCloud.UI.aws_console_frame = (function() {

    function render(data) {
        // Print header
        d3.select("#aws-console-container")
            .text(function(d) { return d.clusterName; })
            .style("font-size", "10px");

        // Enter mode
        var divrow = d3.select("#aws-console-container").selectAll("div.row")
            .data(data)
            .enter()
            .append("div")
            .attr("class", "row");

        divrow.append("div")
            .attr("class", "col-md-3").style("padding-left", 0)
            .text(function(d, i) { return d.nodeTable[i-1].hostname; });

        divrow.append("div").attr("class", "col-md-3").style("padding-left", 0)
            .text(function(d, i) { return d.nodeTable[i-1].ipAddress; });

        divrow.append("div").attr("class", "col-md-2").style("padding-right", 0)
            .text(function(d, i) { return d.nodeTable[i-1].status; });

        col4 = divrow.append("div").attr("class", "col-md-4").style("padding", 0);
//                .text(function(d) { return d.load; })
//              .style("color", function (d) { if (d.load > 80) { return "red"; }
//                                             else return "black"; });

        col4.append("div").attr("class", "bar")
            .style("width", function (d, i) { return d.nodeTable[i-1].load / 1.5 + "px"; })
            .style("background-color", function(d, i) { if (d.nodeTable[i-1].load > 90) { return "DarkRed" }
            else if (d.nodeTable[i-1].load > 50) { return "Gold" }
            else return "DarkGreen"; });

        col4.append("div").attr("class", "bar")
            .style("width", function (d, i) { return 50 - (d.nodeTable[i-1].load / 1.5) + "px"; })
            .style("background-color", function(d, i) { if (50 - d.nodeTable[i-1].load > 90) { return "DarkRed" }
            else if (50 - d.nodeTable.load > 50) { return "Gold" }
            else return "DarkGreen"; });



        d3.select("#aws-console-container").selectAll("div.row")
            .data(data)
            .exit()
            .remove();
    }

    function pad(i) {
        if (i < 10) return "00" + i;
        else if (i < 100) return "0" + i;
        else return i;
    }

    var Cluster = {};


    Cluster.create = function (name, nnode, ncore) {
        this.clusterName = name;
        this.nNode = nnode;
        this.nCore = ncore;
        this.nodeTable = [];


        for (var i = 0; i < nnode; i++) {
            this.nodeTable[i] = { "hostname": (i == 0) ? "master" : "node" + pad(i),
                "ipAddress": "192.168.100." + (i + 1.0),
                "status": "ok",
                "load": Math.round(Math.random() * 100)  };
        }

        return this;
    };

    Cluster.addNode = function () {
        this.nodeTable[this.nNode] = { "hostname": "node" + pad(this.nNode),
            "ipAddress": "192.168.100." + (this.nNode + 1.0),
            "status": "ok",
            "load": Math.round(Math.random() * 100) };
        this.nNode++;
    };

    Cluster.removeNode = function () {
        if (this.nNode ==1) {
            console.log("cannot remove master");
            return;
        }
        this.nodeTable.pop();
        this.nNode--;
    };

    Cluster.changeStatus = function(node, status) {
        this.nodeTable[node]["status"] = status;
    };

    Cluster.changeLoad = function(node, load) {
        this.nodeTable[node]["load"] = load;
    };



    var result = {

        body: function() {
            return RCloud.UI.panel_loader.load_snippet('aws-console-snippet');
        },
        init: function() {
            // var that = this;

            // replace array with api callback d3.json( http.get api, callback )
            // visualization is data driven

            Cluster.create("ML Cluster1", 4, 4);
            Cluster.addNode();
            Cluster.addNode();
            Cluster.removeNode();
            Cluster.removeNode();
            Cluster.removeNode();
            Cluster.removeNode();
            Cluster.removeNode();
            Cluster.removeNode();
            Cluster.removeNode();
            Cluster.removeNode();
            Cluster.addNode();
            Cluster.addNode();
            Cluster.addNode();
            Cluster.addNode();
            Cluster.addNode();
            Cluster.addNode();
            Cluster.addNode();
            Cluster.addNode();
            Cluster.addNode();
            Cluster.addNode();
            Cluster.addNode();
            Cluster.addNode();
            Cluster.addNode();


/*            var clusterStatus = [
                { "hostname": "master",
                    "ipAddress": "172.186.0.100",
                    "status": "up",
                    "load": 80 },
                { "hostname": "node001",
                    "ipAddress": "172.186.0.101",
                    "status": "up",
                    "load": 70 },
                { "hostname": "node002",
                    "ipAddress": "172.186.0.102",
                    "status": "up",
                    "load": 40 },
                { "hostname": "node003",
                    "ipAddress": "172.186.0.103",
                    "status": "up",
                    "load": 50 }
            ];
*/
            setInterval(function () {
                for (var i = 0; i < Cluster.nNode; i++) {
                    Cluster.changeLoad(i, Math.round(Math.random() * 100));
                }
                render(Cluster);
            }, 2000); 

            // var scroll_height = "";

            // Print header
//            d3.select("#aws-console-container")
//                .text("ML-DRF Cluster")
//                .style("font-size", "10px");

            render(Cluster.nodeTable);

        }
    };
    console.log("aws_console");
    return result;
})();

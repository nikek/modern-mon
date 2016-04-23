export default function setupNoData(ctrl) {
  var noData = ctrl.plane.append("text")
    .attr("dy", ".35em")
    .style("font-size", "3em")
    .style("fill", "#999999")
    .style("display", "none");

  noData.text("No Data");

  var reposition = function() {
    if (!ctrl.isEmpty) {
      noData.style("display", "none");
      return;
    }

    var BB = noData.node().getBBox();
    var x = ctrl.width / 2 - BB.width / 2;
    var y = ctrl.height / 2;
    noData.attr("transform", "translate(" + x + "," + y + ")");
    noData.style("display", null);
  };

  ctrl.addRenderer(reposition);
}

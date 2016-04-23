export default function setupNoData(ctrl) {
  var noData = ctrl.plane.append('text')
    .attr('dy', '.3em')
    .attr('text-anchor', 'middle')
    .style('font-size', '3em')
    .style('fill', '#999999')
    .style('display', 'none');

  noData.text('No Data');

  var reposition = function() {
    if (!ctrl.isEmpty) {
      noData.style('display', 'none');
      return;
    }

    const x = ctrl.width/2
    const y = ctrl.height/2

    noData
      .attr('transform', `translate(${x}, ${y})`)
      .style('display', null);
  };

  ctrl.addRenderer(reposition);
}

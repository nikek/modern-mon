import d3 from 'd3'

export default function setupCursor(ctrl) {
  ctrl.on('mouseover', function(){
    d3.select('body').on('keydown', function(){
      if(d3.event.metaKey || d3.event.ctrlKey){
        ctrl.svg.style('cursor', 'move');
      }
    });

    d3.select('body').on('keyup', function(){
      ctrl.svg.style('cursor', null);
    });
  });

  ctrl.on('mousemove', function(){
    if(!d3.event.metaKey && !d3.event.ctrlKey){
      ctrl.svg.style('cursor', null);
    }
  });

  ctrl.on('mouseout', function(){
    d3.select('body').on('keydown', null);
    d3.select('body').on('keyup', null);
  });
}

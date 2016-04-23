import MonChart from './mon-chart-logic'

<mon-chart-canvas>
  <script>
    const elem = this.root;
    const chart = new MonChart()

    chart.configure(elem)
    chart.updateOptions(opts.options)

    this.on('update', () => {
      if(opts.range){
        chart.range = opts.range
        chart.updateRange()
      }
      if(opts.data && opts.data.length){
        chart.update(opts.data);
      }
    })
    
    function sizeChanged() {
      requestAnimationFrame(() => {
        var w = elem.clientWidth;
        var h = elem.clientHeight;

        chart.updateDimensions(w, h);
        chart.render();
      })
    }

    window.addEventListener('resize', sizeChanged)
    sizeChanged()
  </script>
</mon-chart-canvas>

<svg-symbol>
  <script>
    this.on('update', function() {
      if(this.opts.link) {
        this.root.innerHTML = ''
        this.root.insertAdjacentHTML('afterbegin', '<svg class="icon icon-home"><use xlink:href="#' + this.opts.link + '"></use></svg>')
      }
    })
  </script>
</svg-symbol>

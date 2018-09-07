class Bezel {
  constructor(container) {
    this.container = container

    this.container.addEventListener('animationend', () => {
      this.container.classList.remove('bezel-transition')
    })
  }

  switch (icon) {
    this.container.innerHTML = icon
    // this.container.classList.add('bezel-transition')
  }
}

export default Bezel
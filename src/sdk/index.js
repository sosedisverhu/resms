(() => {
  class ReSMS {
    initialize = () => {
      const [checkbox] = document.querySelectorAll('[data-resms]');

      if (!checkbox) {
        return;
      }

      checkbox.addEventListener('change', this.handleCheckboxChange);
    };

    handleCheckboxChange = (event) => {
      if (event.target.checked) {
        window.open('https://resms.io/campaigns/new', 'resms', 'height=600,width=800');
      }
    }
  }

  window.ReSMS = new ReSMS();
})();

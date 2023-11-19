import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["row"]

  dragstart(event) {
    const id = event.target.closest('tr').dataset.id;
    event.dataTransfer.setData('text/plain', id);
    event.target.closest('tr').classList.add('dragging');
  }

  dragover(event) {
    event.preventDefault();
    const draggingEl = this.element.querySelector('.dragging');
    const hoverEl = event.target.closest('tr');
    if (draggingEl && hoverEl) {
      const siblings = Array.from(this.element.children);
      const hoverElIndex = siblings.indexOf(hoverEl);
      const draggingElIndex = siblings.indexOf(draggingEl);
      const nextSibling = hoverElIndex > draggingElIndex ? hoverEl.nextSibling : hoverEl;
      this.element.insertBefore(draggingEl, nextSibling);
    }
      console.log('dragover');
  }

  drop(event) {
    event.preventDefault();
    const id = event.dataTransfer.getData('text');
    const element = this.element.querySelector(`[data-id="${id}"]`);
    if (element) {
      element.classList.remove('dragging');

      // Get the new position of the track
      const newPosition = Array.from(this.element.children).indexOf(element) + 1;

      // Send a request to the server to update the order of the tracks
      fetch(`/tracks/${id}/reorder`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': document.querySelector('[name="csrf-token"]').content
        },
        body: JSON.stringify({ id, position: newPosition })
      }).then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log('Track order updated');
      }).catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });

    }
    console.log('drop');
  }
}

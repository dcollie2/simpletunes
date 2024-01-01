import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "audioPlayer", "trackTitle", "track", "nextButton", "prevButton" ]

  connect() {
    this.currentTrack = 0;
    this.playTrack(this.currentTrack, false);

    this.audioPlayerTarget.addEventListener('ended', () => {
      this.currentTrack++;
      if (this.currentTrack === this.trackTargets.length) {
        this.currentTrack = 0;
      }
      this.playTrack(this.currentTrack);
    });
  }

  next() {
    this.currentTrack++;
    if (this.currentTrack === this.trackTargets.length) {
      this.currentTrack = 0;
    }
    this.playTrack(this.currentTrack);
  }

  previous() {
    this.currentTrack--;
    if (this.currentTrack < 0) {
      this.currentTrack = this.trackTargets.length - 1;
    }
    this.playTrack(this.currentTrack);
  }

  playTrack(index, autoplay=true) {
    const track = this.trackTargets[index];
    this.audioPlayerTarget.src = track.dataset.audioUrl;
    this.trackTitleTarget.innerHTML = track.dataset.title;
    if (autoplay) {
      this.audioPlayerTarget.play();
    }
  }
}

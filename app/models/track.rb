class Track < ApplicationRecord
  has_rich_text :notes
  has_one_attached :audio

  validate :correct_audio_mime_type

  acts_as_list

  private

  def correct_audio_mime_type
    if audio.attached? && !audio.content_type.in?(%w(audio/mpeg audio/wav))
      errors.add(:audio, 'Must be a MP3 or WAV file')
    end
  end

end

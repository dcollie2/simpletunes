class Track < ApplicationRecord
  has_rich_text :notes
  has_one_attached :audio

  validate :correct_audio_mime_type

  acts_as_list

  private

  def correct_audio_mime_type
    if audio.attached? && !audio.content_type == 'audio/mpeg'
      errors.add(:audio, 'Must be an MP3 file')
    end
  end

end

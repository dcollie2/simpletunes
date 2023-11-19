class AddPositionToTracks < ActiveRecord::Migration[7.1]
  def change
    add_column :tracks, :position, :integer
    Track.order(:updated_at).each.with_index(1) do |track, index|
      track.update_column :position, index
    end

  end
end

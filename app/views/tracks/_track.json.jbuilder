json.extract! track, :id, :title, :notes, :created_at, :updated_at
json.url track_url(track, format: :json)
json.notes track.notes.to_s

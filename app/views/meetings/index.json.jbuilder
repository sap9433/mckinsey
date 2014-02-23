json.array!(@meetings) do |meeting|
  json.extract! meeting, :id, :uid, :name, :agenda, :desc, :timing
  json.url meeting_url(meeting, format: :json)
end

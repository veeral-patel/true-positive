require 'segment/analytics'

Analytics = Segment::Analytics.new({
    write_key: 'UzKN9Pcx7BFOCuU0qFhqGkJ9Wm0Qrm22',
    on_error: Proc.new { |status, msg| print msg }
})

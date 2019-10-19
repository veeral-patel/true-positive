class Types::IndicatorTypeEnum < Types::BaseEnum
    description "Lists the different types of indicators."

    value "STRING" do
        description "Examples include file hashes, IPs, and URLs."
    end

    value "TEXT" do
        description "Examples include Snort rules and Exif metadata."
    end

    value "FILE" do
        description "A malware sample is one example."
    end
end

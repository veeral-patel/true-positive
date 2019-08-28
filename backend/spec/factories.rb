FactoryBot.define do
  factory :status do
    name { Faker::Alphanumeric.unique.alpha 5  }
    description { Faker::Alphanumeric.unique.alpha 5  }
  end

  factory :priority do
    name { Faker::Alphanumeric.unique.alpha 5  }
    description { Faker::Alphanumeric.unique.alpha 5  }
  end

  factory :user do
    username { Faker::Internet.unique.username }
    email { Faker::Internet.unique.email }
  end

  factory :case do
    name { Faker::Alphanumeric.unique.alpha 5 }
    association :created_by, factory: :user
    status
    priority
  end

  factory :task do
    name { Faker::Alphanumeric.unique.alpha 5 }
    association :created_by, factory: :user
    association :case, factory: :case
    status
    priority
  end
end
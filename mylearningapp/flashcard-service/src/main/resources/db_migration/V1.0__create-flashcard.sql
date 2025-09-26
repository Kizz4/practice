CREATE TABLE flashcard(
    id BIGINT PRIMARY KEY,
    owner_id UUID FOREIGN KEY,
    front TEXT CHECK(length(front) <= ${front_max_len}) NOT NULL,
    back TEXT CHECK(length(back) <= ${back_max_len}) NOT NULL,
    type VARCHAR(${type_max_len}) NOT NULL,
    visibility VARCHAR(${visibility_max_len}) NOT NULL
    
);
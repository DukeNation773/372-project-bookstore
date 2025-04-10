INSERT INTO products (name, author, description, image_path, type, category_id, page_count, price)
VALUES 
(
    'Red Rising',
    'Pierce Brown',
    'Set in a distopian future, Darrow will stop at nothing for revenge, even if he must become the enemy to do so.',
    '/images/redrising.png',
    'Fiction',
    1, -- Science Fiction
    382,
    15.99
),
(
    'The Hobbit',
    'J.R.R. Tolkien',
    'A classic novel that follows the reluctant hero, Bilbo Baggins, a hobbit, as he embarks on an unexpected journey with a group of dwarves to reclaim their treasure from the dragon Smaug',
    '/images/hobbit.png',
    'Fiction',
    2, -- Fantasy
    310,
    10.50
),
(
    'The Glass Castle',
    'Jeannette Walls',
    'A memoir about the authors unconventional upbringing in a dysfunctional family.',
    '/images/glasscastle.png',
    'Non-Fiction',
    21, -- Memoir
    288,
    12.99
),
(
    'No Country For Old Men',
    'Cormac McCarthy',
    'A drug deal gone wrong in West Texas, where a man stumbles upon the aftermath, a sociopathic hitman hunts him, and an aging sheriff struggles to maintain order in a changing world.',
    '/images/oldmen.png',
    'Fiction',
    7, -- Crime
    320,
    18.75
),
(
    'The Fault in Our Stars',
    'John Green',
    'A touching story of two teens who fall in love while battling cancer.',
    '/images/faultstars.png',
    'Fiction',
    6, -- Romance
    313,
    11.00
);

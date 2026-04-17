USE nittanyconf;

-- Users
INSERT INTO users (email, name, phone, age, address) VALUES
('alice.johnson@example.com', 'Alice Johnson', '555-123-4567', 34, '123 Maple St, State College, PA'),
('bob.martinez@example.com', 'Bob Martinez', '555-234-5678', 28, 'Penn State University'),
('carol.white@example.com', 'Carol White', '', 21, '456 Oak Ave, Bellefonte, PA'),
('david.kim@example.com', 'David Kim', '555-345-6789', 22, 'Penn State University'),
('eva.nguyen@example.com', 'Eva Nguyen', '555-456-7890', 45, '789 Pine Rd, Altoona, PA');

-- Conferences
INSERT INTO conferences (title, description, category, format, entryPrice, additionalInfo, approved) VALUES
('Introduction to Web Development', 'A beginner-friendly workshop covering the fundamentals of HTML, CSS, and JavaScript. No prior experience required.', 'Workshop', 'In-Person', 0.00, 'Please bring a laptop with a modern browser installed.', 0),
('AI in Healthcare', 'An in-depth keynote exploring how artificial intelligence is transforming diagnostics, treatment planning, and patient care.', 'Keynote', 'Hybrid', 25.00, 'Recording will be available to virtual attendees after the event.', 0),
('The Future of Remote Work', 'A panel discussion featuring industry leaders sharing insights on remote work culture, tooling, and team management.', 'Panel Discussion', 'Virtual', 10.00, '', 0),
('Cybersecurity Best Practices', 'A general session covering the latest threats and how organizations can protect themselves in an increasingly connected world.', 'General Session', 'In-Person', 15.00, 'Recommended for IT staff and managers.', 0),
('Opening Night Networking Mixer', 'Kick off the conference with drinks, snacks, and the chance to meet fellow attendees, speakers, and sponsors.', 'Networking', 'In-Person', 0.00, 'Light refreshments provided. Badge required for entry.', 0),
('Agile Project Management Deep Dive', 'A hands-on workshop walking through sprint planning, retrospectives, and agile tooling with real world examples.', 'Workshop', 'Hybrid', 20.00, 'Participants will leave with a ready-to-use sprint template.', 0);

-- Products
INSERT INTO products (name, image, description, category, specifications, price, additionalInfo) VALUES
('Conference T-Shirt', '', 'Official conference branded t-shirt available in sizes S-XXL.', 'Apparel', '100% cotton, unisex fit', 24.99, 'Available in black and white.'),
('Wireless Presenter Remote', '', 'Compact wireless presenter with laser pointer, perfect for keynote speakers.', 'Electronics', '2.4GHz wireless, USB receiver, 30ft range', 34.99, 'Batteries included.'),
('Conference Notebook Bundle', '', 'Set of 3 lined notebooks with conference branding for note-taking during sessions.', 'Stationery', 'A5 size, 80 pages each, ruled', 12.50, 'Includes one pen.');

-- Conference Signups
INSERT INTO conference_signups (fullName, email, conferenceId, participationType, notes) VALUES
('Alice Johnson', 'alice.johnson@example.com', 1, 'in-person', 'No dietary restrictions'),
('Bob Martinez', 'bob.martinez@example.com', 1, 'in-person', 'Vegetarian dietary restrictions'),
('Alice Johnson', 'alice.johnson@example.com', 2, 'virtual', ''),
('David Kim', 'david.kim@example.com', 4, 'vip', 'IT staff member');

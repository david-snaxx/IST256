// ============================================================
// testData.js
// This set of entries can be used to test various data classes
// without the need to manually fill out various forms.
// Note: this file must be run on a project page, not an arbitrary browser tab,
// as it depends on the ConferenceEntry and User classes being defined.
//
// To use this data:
// 1. Open the project in your browser to any page
// 2. Open DevTools (usually f12)
// 3. Go to the Console tab
// 4. Copy all contents of this file and paste them into the console and press enter.
// 5. You should see "Test data loaded: 6 entries, 5 users" or some such similar message.
//
// To confirm that this data has successfully been loaded:
// 1. Open DevTools
// 2. Go to the Application tab
// 3. In the left sidebar, look under Storage for Local Storage
// 4. Expand Local storage and you should see "http://localhost:63342" or whatever your localhost URI is.
// ============================================================

const testEntries = [
    new ConferenceEntry(
        "1",
        "Introduction to Web Development",
        "A beginner-friendly workshop covering the fundamentals of HTML, CSS, and JavaScript. No prior experience required.",
        "Workshop",
        "In-Person",
        "0.00",
        "Please bring a laptop with a modern browser installed."
    ),
    new ConferenceEntry(
        "2",
        "AI in Healthcare",
        "An in-depth keynote exploring how artificial intelligence is transforming diagnostics, treatment planning, and patient care.",
        "Keynote",
        "Hybrid",
        "25.00",
        "Recording will be available to virtual attendees after the event."
    ),
    new ConferenceEntry(
        "3",
        "The Future of Remote Work",
        "A panel discussion featuring industry leaders sharing insights on remote work culture, tooling, and team management.",
        "Panel Discussion",
        "Virtual",
        "10.00",
        ""
    ),
    new ConferenceEntry(
        "4",
        "Cybersecurity Best Practices",
        "A general session covering the latest threats and how organizations can protect themselves in an increasingly connected world.",
        "General Session",
        "In-Person",
        "15.00",
        "Recommended for IT staff and managers."
    ),
    new ConferenceEntry(
        "5",
        "Opening Night Networking Mixer",
        "Kick off the conference with drinks, snacks, and the chance to meet fellow attendees, speakers, and sponsors.",
        "Networking",
        "In-Person",
        "0.00",
        "Light refreshments provided. Badge required for entry."
    ),
    new ConferenceEntry(
        "6",
        "Agile Project Management Deep Dive",
        "A hands-on workshop walking through sprint planning, retrospectives, and agile tooling with real world examples.",
        "Workshop",
        "Hybrid",
        "20.00",
        "Participants will leave with a ready-to-use sprint template."
    )
];

const testUsers = [
    new User(
        "Alice Johnson",
        "alice.johnson@example.com",
        "555-123-4567",
        "34",
        "123 Maple St, State College, PA"
    ),
    new User(
        "Bob Martinez",
        "bob.martinez@example.com",
        "555-234-5678",
        "28",
        "Penn State University"
    ),
    new User(
        "Carol White",
        "carol.white@example.com",
        "",
        "Junior",
        "456 Oak Ave, Bellefonte, PA"
    ),
    new User(
        "David Kim",
        "david.kim@example.com",
        "555-345-6789",
        "22",
        "Penn State University"
    ),
    new User(
        "Eva Nguyen",
        "eva.nguyen@example.com",
        "555-456-7890",
        "45",
        "789 Pine Rd, Altoona, PA"
    )
];

localStorage.setItem('entries', JSON.stringify(testEntries));
localStorage.setItem('users', JSON.stringify(testUsers));

console.log(`Test data loaded: ${testEntries.length} entries, ${testUsers.length} users.`);
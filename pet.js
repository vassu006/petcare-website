```javascript
/* =========================================================
   PETCARE WEBSITE
   JAVASCRIPT FILE - pet.js
   ========================================================= */


/* =========================
   MOBILE MENU
   ========================= */

function toggleMenu() {

    const navbar = document.getElementById("navbar");

    navbar.classList.toggle("active");
}


/* Close mobile menu when a link is clicked */

document.querySelectorAll(".navbar a").forEach(function(link) {

    link.addEventListener("click", function() {

        document.getElementById("navbar").classList.remove("active");

    });

});


/* =========================
   SEARCH POPUP
   ========================= */

function openSearch() {

    const overlay = document.getElementById("searchOverlay");

    overlay.classList.add("active");

    setTimeout(function() {

        document.getElementById("searchPet").focus();

    }, 200);

}


function closeSearch() {

    document.getElementById("searchOverlay").classList.remove("active");

    document.getElementById("searchPet").value = "";

    document.getElementById("searchResults").innerHTML = "";

}


/* =========================
   SEARCH FUNCTION
   ========================= */

function searchContent() {

    const input = document
        .getElementById("searchPet")
        .value
        .toLowerCase()
        .trim();

    const results = document.getElementById("searchResults");

    results.innerHTML = "";


    if (input === "") {

        results.innerHTML =
            "<p style='text-align:center;color:#777;'>Start typing to search...</p>";

        return;
    }


    const searchableItems = document.querySelectorAll(
        ".pet-card, .service-card, .tip-card"
    );


    let found = 0;


    searchableItems.forEach(function(item) {

        const searchText =
            (
                item.innerText +
                " " +
                (item.getAttribute("data-search") || "")
            ).toLowerCase();


        if (searchText.includes(input)) {

            found++;


            const title =
                item.querySelector("h3")?.innerText || "PetCare Information";


            const description =
                item.querySelector("p")?.innerText || "";


            const result = document.createElement("div");

            result.className = "search-result";


            result.innerHTML = `
                <strong>${title}</strong>
                <small>${description}</small>
            `;


            result.addEventListener("click", function() {

                closeSearch();

                item.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });


                item.style.transform = "scale(1.03)";

                setTimeout(function() {
                    item.style.transform = "";
                }, 700);

            });


            results.appendChild(result);

        }

    });


    if (found === 0) {

        results.innerHTML = `
            <p style="text-align:center;color:#777;padding:20px;">
                No results found 🐾
            </p>
        `;

    }

}


/* =========================
   PET INFORMATION
   ========================= */

function showPetInfo(pet) {

    let message = "";


    if (pet === "Dogs") {

        message = `
            🐶 <strong>Dog Care Tips</strong><br><br>
            • Provide balanced food<br>
            • Give regular exercise<br>
            • Keep vaccinations updated<br>
            • Maintain proper grooming<br>
            • Visit a veterinarian for regular checkups
        `;

    }


    else if (pet === "Cats") {

        message = `
            🐱 <strong>Cat Care Tips</strong><br><br>
            • Provide fresh drinking water<br>
            • Give suitable nutrition<br>
            • Keep the litter area clean<br>
            • Provide safe play activities<br>
            • Schedule regular veterinary checkups
        `;

    }


    else if (pet === "Birds") {

        message = `
            🦜 <strong>Bird Care Tips</strong><br><br>
            • Provide clean water<br>
            • Give appropriate bird food<br>
            • Keep the cage hygienic<br>
            • Allow safe activity<br>
            • Keep birds away from harmful fumes
        `;

    }


    else if (pet === "Rabbits") {

        message = `
            🐰 <strong>Rabbit Care Tips</strong><br><br>
            • Provide suitable hay and food<br>
            • Give fresh water<br>
            • Keep the living area clean<br>
            • Allow daily movement<br>
            • Contact a veterinarian when your rabbit seems unwell
        `;

    }


    showMessage(message);

}


/* =========================
   APPOINTMENT MODAL
   ========================= */

function openAppointment() {

    document
        .getElementById("appointmentModal")
        .classList.add("active");

}


function closeAppointment() {

    document
        .getElementById("appointmentModal")
        .classList.remove("active");

}


/* =========================
   BOOK APPOINTMENT
   ========================= */

function bookAppointment(event) {

    event.preventDefault();


    const ownerName =
        document.getElementById("ownerName").value.trim();

    const petName =
        document.getElementById("petName").value.trim();

    const petType =
        document.getElementById("petType").value;

    const date =
        document.getElementById("appointmentDate").value;


    if (!ownerName || !petName || !petType || !date) {

        showMessage("Please fill all appointment details.");

        return;

    }


    closeAppointment();


    showMessage(
        `Appointment request received for ${petName} 🐾`
    );


    event.target.reset();

}


/* =========================
   CONTACT FORM
   ========================= */

function submitContact(event) {

    event.preventDefault();


    const name =
        document.getElementById("contactName").value.trim();


    if (!name) {

        showMessage("Please enter your name.");

        return;

    }


    showMessage(
        `Thank you, ${name}! Your message has been received ❤️`
    );


    event.target.reset();

}


/* =========================
   TOAST / POPUP MESSAGE
   ========================= */

let toastTimer;


function showMessage(message) {

    const toast =
        document.getElementById("toast");

    const toastMessage =
        document.getElementById("toastMessage");


    toastMessage.innerHTML = message;

    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer = setTimeout(function() {

        toast.classList.remove("show");

    }, 3500);

}


/* =========================
   GOOGLE MAPS SEARCH
   ========================= */

function findHospitals() {

    const location =
        document
            .getElementById("hospitalLocation")
            .value
            .trim();


    if (location === "") {

        showMessage(
            "Please enter your city or area first."
        );

        return;

    }


    const map =
        document.getElementById("googleMap");


    const searchQuery =
        encodeURIComponent(
            "veterinary hospitals near " + location
        );


    map.src =
        "https://www.google.com/maps?q=" +
        searchQuery +
        "&output=embed";


    showMessage(
        "Showing veterinary hospitals near " +
        location + " 📍"
    );

}


/* =========================
   ENTER KEY FOR MAP SEARCH
   ========================= */

document
    .getElementById("hospitalLocation")
    .addEventListener("keypress", function(event) {

        if (event.key === "Enter") {

            findHospitals();

        }

    });


/* =========================
   CLOSE POPUPS WHEN CLICKING
   OUTSIDE
   ========================= */

document
    .getElementById("searchOverlay")
    .addEventListener("click", function(event) {

        if (event.target === this) {

            closeSearch();

        }

    });


document
    .getElementById("appointmentModal")
    .addEventListener("click", function(event) {

        if (event.target === this) {

            closeAppointment();

        }

    });


/* =========================
   ESC KEY
   ========================= */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        closeSearch();

        closeAppointment();

    }

});


/* =========================
   SET MINIMUM APPOINTMENT DATE
   ========================= */

const dateInput =
    document.getElementById("appointmentDate");


if (dateInput) {

    const today =
        new Date().toISOString().split("T")[0];

    dateInput.min = today;

}


/* =========================
   ACTIVE NAVIGATION
   ========================= */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".navbar a");


window.addEventListener("scroll", function() {

    let current = "";


    sections.forEach(function(section) {

        const sectionTop =
            section.offsetTop - 120;

        if (window.scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });


    navLinks.forEach(function(link) {

        link.classList.remove("active");

        if (
            link.getAttribute("href") === "#" + current
        ) {

            link.classList.add("active");

        }

    });

});


/* =========================
   WELCOME MESSAGE
   ========================= */

window.addEventListener("load", function() {

    setTimeout(function() {

        showMessage(
            "Welcome to PetCare! 🐾 Take care of your best friend."
        );

    }, 1000);

});
// ==========================================
// SERVICE INFORMATION POPUP
// ==========================================

const serviceDetails = {

    health: {
        icon: "🩺",
        title: "Pet Health Checkups",
        content: `
            <p>
                Regular health checkups help identify health problems
                early and keep your pet active and healthy.
            </p>

            <h4>What is included?</h4>

            <ul>
                <li>✔ General physical examination</li>
                <li>✔ Weight and growth monitoring</li>
                <li>✔ Dental and oral health check</li>
                <li>✔ Skin and coat examination</li>
                <li>✔ Basic health guidance</li>
            </ul>

            <p class="important-note">
                💡 Regular veterinary checkups are important even when
                your pet appears healthy.
            </p>

            <button onclick="bookFromService()">
                📅 Book Appointment
            </button>
        `
    },

    grooming: {
        icon: "✂️",
        title: "Pet Grooming",
        content: `
            <p>
                Grooming is an important part of keeping pets clean,
                comfortable and healthy.
            </p>

            <h4>Our grooming care includes:</h4>

            <ul>
                <li>✔ Bathing and cleaning</li>
                <li>✔ Brushing and coat care</li>
                <li>✔ Nail care</li>
                <li>✔ Ear cleaning</li>
                <li>✔ Basic hygiene care</li>
            </ul>

            <p class="important-note">
                🐾 Regular grooming can help maintain healthy skin
                and a clean coat.
            </p>

            <button onclick="bookFromService()">
                📅 Book Grooming
            </button>
        `
    },

    vaccination: {
        icon: "💉",
        title: "Pet Vaccination",
        content: `
            <p>
                Vaccination helps protect pets from several serious
                infectious diseases.
            </p>

            <h4>Why is vaccination important?</h4>

            <ul>
                <li>✔ Helps prevent infectious diseases</li>
                <li>✔ Supports your pet's immune system</li>
                <li>✔ Helps protect other animals</li>
                <li>✔ Keeps vaccination records organized</li>
                <li>✔ Supports long-term pet health</li>
            </ul>

            <p class="important-note">
                💡 Vaccination schedules depend on the pet's age,
                species and health. Always follow advice from a veterinarian.
            </p>

            <button onclick="bookFromService()">
                📅 Book Vaccination
            </button>
        `
    },

    emergency: {
        icon: "🚑",
        title: "Emergency Pet Help",
        content: `
            <p>
                If your pet suddenly becomes seriously unwell or is
                injured, contact a veterinarian or emergency animal
                hospital as soon as possible.
            </p>

            <h4>In an emergency:</h4>

            <ul>
                <li>✔ Stay calm and keep your pet safe</li>
                <li>✔ Contact a veterinarian immediately</li>
                <li>✔ Avoid giving medicines without veterinary advice</li>
                <li>✔ Take your pet to an appropriate veterinary facility</li>
            </ul>

            <p class="important-note">
                🚨 This website provides general information and does
                not replace professional veterinary care.
            </p>

            <button onclick="findHospitals()">
                🏥 Find Veterinary Hospitals
            </button>
        `
    }
};


function openService(service) {

    const modal = document.getElementById("serviceModal");
    const body = document.getElementById("serviceModalBody");

    const data = serviceDetails[service];

    if (!data) return;

    body.innerHTML = `
        <div class="service-popup-icon">${data.icon}</div>
        <h2>${data.title}</h2>
        <div class="service-popup-text">
            ${data.content}
        </div>
    `;

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
}


function closeService() {

    document.getElementById("serviceModal")
        .classList.remove("active");

    document.body.style.overflow = "auto";
}


function bookFromService() {

    closeService();
    openAppointment();
}


// Close service popup when clicking outside

document.getElementById("serviceModal").addEventListener("click", function(event) {

    if (event.target === this) {
        closeService();
    }

});


// ==========================================
// NAVIGATION SEARCH
// ==========================================

function navSearch() {

    const input = document.getElementById("navSearch");

    if (!input) return;

    const query = input.value.toLowerCase().trim();

    if (query.length < 2) return;

    const sections = [
        {
            words: ["pet", "pets", "dog", "cat", "bird", "rabbit"],
            target: "#pets"
        },
        {
            words: ["service", "health", "checkup", "grooming", "vaccination", "vaccine", "emergency"],
            target: "#services"
        },
        {
            words: ["tip", "tips", "care", "nutrition", "exercise", "hygiene"],
            target: "#tips"
        },
        {
            words: ["hospital", "doctor", "vet", "veterinary"],
            target: "#hospitals"
        },
        {
            words: ["contact", "phone", "email"],
            target: "#contact"
        }
    ];

    for (const section of sections) {

        if (
            section.words.some(word =>
                word.includes(query) || query.includes(word)
            )
        ) {

            document.querySelector(section.target)
                .scrollIntoView({
                    behavior: "smooth"
                });

            input.blur();

            return;
        }
    }

    showMessage("No matching section found 🔍");
}


// Escape key closes service modal too

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        closeService();
    }

});
const byId = id => document.getElementById(id);

function setModal(modal, open) {
  modal.classList.toggle("show", open);
  modal.setAttribute("aria-hidden", String(!open));
  document.body.classList.toggle(
    "modal-open",
    open || document.querySelector(".modal.show, .search-overlay.show")
  );
}

function openAppointment() {
  setModal(byId("appointmentModal"), true);

  setTimeout(() => {
    byId("ownerName").focus();
  }, 100);
}

function closeAppointment() {
  setModal(byId("appointmentModal"), false);
}

function closeInfo() {
  setModal(byId("infoModal"), false);
}

function bookAppointment(event) {
  event.preventDefault();

  const date = byId("appointmentDate").value;

  closeAppointment();
  event.target.reset();

  showMessage(
    `Appointment request received${date ? ` for ${date}` : ""}. We’ll contact you soon!`
  );
}
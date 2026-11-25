
/* homework 5 - get to know me component */

class RandomFacts extends HTMLElement {
    constructor() {
      super();
  
      // facts about me
      this.facts = [
        {
          fact: "I am a Cognitive Science student minoring in Computer Science at UC San Diego.",
          details: "Studying cognitive science has allowed me to explore how people think, learn, and interact with the world around them. Through my computer science minor, I have also developed programming and problem-solving skills that allow me to apply these concepts to technology. I am especially interested in the connection between human behavior and technology, including how software and digital interfaces can be designed to be more intuitive, accessible, and efficient. In the future, I hope to combine both fields to develop technology that not only functions well but also considers the needs and experiences of the people using it."
        },
        {
          fact: "My hobbies include playing tennis, video games, and finding a good matcha.",
          details: "I've been playing tennis since I was young, and it has always been one of my favorite ways to stay active. I also enjoy playing video games, especially Minecraft and The Sims, because I love the creativity they allow. Another hobby of mine is exploring different cafes and trying their matcha. Some of my favorite matcha spots in San Diego are Hinae and Labora."
        },
        {
          fact: "I currently work at Sephora.",
          details: "Working in retail has helped me develop communication and problem-solving skills. I hope to combine these skills with my background in cognitive science and computer science to work on technology that improves how people interact with products and services."
        }
      ];
  
      this.currentFact = 0;
    }
  
    // watch for the details attribute
    static get observedAttributes() {
      return ["details"];
    }
  
    connectedCallback() {
      // stop the component from being created twice
      if (this.factText) {
        return;
      }
  
      // create the heading
      const heading = document.createElement("h3");
      heading.textContent = "Get to Know Me!";
  
      // show the current personal fact
      this.factText = document.createElement("p");
      this.factText.textContent = this.facts[this.currentFact].fact;
  
      // show the details when the button is clicked
      this.detailsText = document.createElement("p");
      this.detailsText.textContent = this.facts[this.currentFact].details;
      this.detailsText.hidden = !this.hasAttribute("details");
  
      // create the next button
      const nextButton = document.createElement("button");
      nextButton.type = "button";
      nextButton.textContent = "Next";
  
      // create the status for personal facts
      this.status = document.createElement("p");
      this.status.setAttribute("role", "status");
      this.status.textContent = "Fact 1 of " + this.facts.length;
  
      // go to the next personal fact
      nextButton.addEventListener("click", () => {
        this.currentFact++;
  
        if (this.currentFact >= this.facts.length) {
          this.currentFact = 0;
        }
  
        this.factText.textContent = this.facts[this.currentFact].fact;
        this.detailsText.textContent = this.facts[this.currentFact].details;
        this.status.textContent =
          "Fact " + (this.currentFact + 1) + " of " + this.facts.length;
      });
  
      // create a heading for the api section
      const apiHeading = document.createElement("h3");
      apiHeading.textContent = "Learn Something Random!";
  
      // create a paragraph for the api fact
      this.apiFact = document.createElement("p");
      this.apiFact.textContent = "Click the button to get a random fact.";
  
      // create the api button
      const apiButton = document.createElement("button");
      apiButton.type = "button";
      apiButton.textContent = "Get Random Fact";
  
      // create a status for api requests
      this.apiStatus = document.createElement("p");
      this.apiStatus.setAttribute("role", "status");
  
      // get a random fact when clicked
      apiButton.addEventListener("click", async () => {
        // show loading message
        this.apiStatus.textContent = "Loading fact...";
        apiButton.disabled = true;
  
        try {
          // request a random fact from the api
          const response = await fetch(
            "https://uselessfacts.jsph.pl/api/v2/facts/random?language=en"
          );
  
          // check if the request worked
          if (!response.ok) {
            throw new Error("HTTP status " + response.status);
          }
  
          // turn the response into json
          const data = await response.json();
  
          // make sure the api returned text
          if (!data || typeof data.text !== "string") {
            throw new Error("Invalid fact received.");
          }
  
          // display the new fact
          this.apiFact.textContent = data.text;
          this.apiStatus.textContent = "New fact loaded!";
        } catch (error) {
          // show an error if something goes wrong
          this.apiStatus.textContent =
            "Could not load a fact. Please try again.";
          console.error("Error loading fact:", error);
        } finally {
          // allow the visitor to try again
          apiButton.disabled = false;
        }
      });
  
      // add the personal facts section
      this.appendChild(heading);
      this.appendChild(this.factText);
      this.appendChild(this.detailsText);
      this.appendChild(nextButton);
      this.appendChild(this.status);
  
      // add the api section
      this.appendChild(apiHeading);
      this.appendChild(this.apiFact);
      this.appendChild(apiButton);
      this.appendChild(this.apiStatus);
    }
  
    // show or hide the personal fact details
    attributeChangedCallback() {
      if (this.detailsText) {
        this.detailsText.hidden = !this.hasAttribute("details");
      }
    }
  }
  
  // register the web component
  customElements.define("random-facts", RandomFacts);
  
  
    
    /* save the show details preference */

    const factsComponent = document.querySelector("random-facts");
    const detailsButton = document.querySelector("#toggle-details");

    if (factsComponent && detailsButton) {

    // update the details and button text
    function updateDetails(showDetails) {
        if (showDetails) {
        factsComponent.setAttribute("details", "");
        detailsButton.textContent = "Hide Details";
        } else {
        factsComponent.removeAttribute("details");
        detailsButton.textContent = "Show Details";
        }
    }

    // hidden details is the default
    let savedDetails = "hidden";

    // try to read the saved preference
    try {
        const storedValue = localStorage.getItem("hw5-facts-details");

        if (storedValue === "shown" || storedValue === "hidden") {
        savedDetails = storedValue;
        }
    } catch (error) {
        console.error("Could not read saved details:", error);
    }

    // restore the saved preference
    updateDetails(savedDetails === "shown");

    // save the preference when clicked
    detailsButton.addEventListener("click", () => {
        const showDetails = !factsComponent.hasAttribute("details");

        // update the page first
        updateDetails(showDetails);

        // try to save the preference
        try {
        if (showDetails) {
            localStorage.setItem("hw5-facts-details", "shown");
        } else {
            localStorage.setItem("hw5-facts-details", "hidden");
        }
        } catch (error) {
        console.error("Could not save details preference:", error);
        }
    });
    }

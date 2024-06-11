
async function fetchUserQuestions(username) {
  const url = 'https://leetcode.com/graphql';
  const query = `
    query {
      recentAcSubmissionList(username: "${username}", limit: 45) {
        id
        title
        titleSlug
        timestamp
      }
    }
  `;
  
  try {
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query }),
      });

      if (!response.ok) {
          throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      for (const submission of data.data.recentAcSubmissionList) {
          submission["question_link"] = `https://leetcode.com/problems/${submission.titleSlug}`;
      }
      try{
        return data.data.recentAcSubmissionList;
      } catch {
        return data;
      }
  } catch (error) {
      console.error('Error:', error);
      return null;
  }
}
if (typeof init === 'undefined') {
  const init = function () {
    console.log("In init function");
    const parentClassName = 'relative.ml-4.flex.items-center.gap-2';
    const elements = document.querySelectorAll(parentClassName);
    console.log("elements: " + elements + " " + elements.length)

    if(elements.length > 0){
      for(let i=0; i < 1+ elements.length; i++){
        const select = document.createElement("select");
        for (let i = 0; i < 4; i++) {
          var opt = document.createElement("option");
          opt.innerText = "This is here ";
          select.appendChild(opt);
        }
        document.body.appendChild(select);
      };
    } else {
      console.log("Could not find the parent element");
    }


    // fetchUserQuestions(username)
    //     .then(data => {
    //         if (data) {
    //           console.log(data[0]);
    //           elements.forEach((element, index) => {
    //             const link = document.createElement('a');
    //             link.href = data[0].question_link;
    //             link.textContent = 'stalk';
    //             element.insertBefore(link, element.firstChild);
    //           })  
    //         } else {
    //             console.log("Failed to fetch user ratings data.");
    //         }
    //     });
  }
  if (document.readyState === 'loading') {
    console.log("Page loading");
    // document.addEventListener('DOMContentLoaded', init);
  } else {
    console.log("Page Loaded");
    init();
  }
}

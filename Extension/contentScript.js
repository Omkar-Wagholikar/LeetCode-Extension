
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
        console.log("Not FISHY");
        return data.data.recentAcSubmissionList;
      } catch {
        console.log("FISHY");
        return data;
      }
  } catch (error) {
      console.error('Error:', error);
      return null;
  }
}
if (typeof init === 'undefined') {
  const init = function () {
    const parentClassName = 'relative.ml-4.flex.items-center.gap-2';
    const elements = document.querySelectorAll('.' + parentClassName);
    const username = "phoenixsan";
    fetchUserQuestions(username)
        .then(data => {
            if (data) {
              console.log(data[0]);
              elements.forEach((element, index) => {
                const link = document.createElement('a');
                link.href = data[0].question_link;
                link.textContent = 'stalk';
                element.insertBefore(link, element.firstChild);
              })  
            } else {
                console.log("Failed to fetch user ratings data.");
            }
        });
  }
  init();
}


              // data = JSON.parse(data);
              // console.log("Success!", data);
              // if (elements.length > 0) {
              //   elements.forEach((element, index) => {
              //     const newElement = document.createElement('div');
              //     const button =  document.createElement('select');
              //     data.forEach(optionData => {
              //       const option = document.createElement('option');
              //       option.value = optionData.value; // Assuming value and text are properties of optionData
              //       option.textContent = optionData.text;
              //       button.appendChild(option);
              //     });
              //     newElement.appendChild(button);
              //     element.insertBefore(newElement, element.firstChild);
              //   });
              // }

  // const username = "anmol_vernekar";
  // fetchUserQuestions(username)
  //     .then(data => {
  //         if (data) {
  //             console.log("Success!", data);
  //         } else {
  //             console.log("Failed to fetch user ratings data.");
  //         }
  //     });
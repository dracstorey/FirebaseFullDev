
// Shows the sign up modal
function showsignup()
{
  signup.style.display = "block";
  signupForm.reset()
  login.style.display="none";
};


// Shows the login modal
function showlogin()
{
  signup.style.display = "none";
  login.style.display="block";
};


// getting data old code
//db.collection('books').get().then((snapshot) =>
 //{
 //   snapshot.docs.forEach(doc => 
 //   {
  //  renderBook(doc)
 //   }
  //  )
 // }
 //   );
 
//update title
//db.collection('books').doc('yV4mCP34I2TLkJLTqErT').update({title='Little Women'})



 // real-time listener


// check for authentication status change
auth.onAuthStateChanged(user => {
  if (user)
  {
    console.log("user signed in");
    list_books()
  }
  else
  {
    console.log("user signed out");
    bookList.innerHTML = "Log in to view books"
  }
})
;

//  constants linked to the index.html page
const bookList = document.querySelector('#book-list')
const form = document.querySelector('#add-book-form')
const signup = document.getElementById('signup')
const login = document.getElementById('login')
const signupForm = document.getElementById('sign-up-form')
const loginForm = document.getElementById('login-form')
const logout = document.getElementById('log-out')

//Sign Up to the Database
signupForm.addEventListener('submit',(e) => {
  e.preventDefault();
  const email = signupForm['email'].value
  const password = signupForm['password'].value
  auth.createUserWithEmailAndPassword(email,password).then(
    cred => {
      loginForm.reset();
      signup.style.display = "none";
    })
});

// Logs user out of the database
logout.addEventListener('click',(e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    // Only needed for testing
    //console.log("user signed out")
  })
});

//Log an existing user in to database
loginForm.addEventListener('submit',(e) => {
  e.preventDefault();
  const email = loginForm['login-email'].value
  const password = loginForm['login-password'].value
  auth.signInWithEmailAndPassword(email,password).then(
    cred => {
      loginForm.reset();
      login.style.display = "none";
    })
});



//Render Books
function renderBook(doc){
  let li = document.createElement('li');
  let title = document.createElement('span');
  let cross = document.createElement('div'); 
  let author = document.createElement('span');
  
  li.setAttribute('data-id', doc.id);
  title.textContent = doc.data().title;
  author.textContent = doc.data().author;
  cross.textContent = 'x';

  li.appendChild(title);
  li.appendChild(author);
  li.appendChild(cross);

  bookList.append(li);

  //deleting data
  cross.addEventListener('click', (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute('data-id');
  db.collection('books').doc(id).delete()})

}

// Real time data listener

function list_books()
{ db.collection('books').orderBy('author').onSnapshot (snapshot => {
   let changes = snapshot.docChanges();
   changes.forEach(change =>
   {
     if (change.type == 'added')
     {
       renderBook(change.doc)
      }
       else if (change.type == 'removed')
       {
         let li = bookList.querySelector('[data-id=' + change.doc.id +']');
         bookList.removeChild(li);
       }
     })
   }) }

  //Adding data
  form.addEventListener('submit',(e) => 
  {
    e.preventDefault();
    db.collection('books').add({
      title: form.title.value,
      author: form.author.value
    });
    form.title.value='';
    form.author.value='';
  })

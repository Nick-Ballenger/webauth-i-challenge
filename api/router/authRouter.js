const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('./users-model');


router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 8); 
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user
        res.status(200).json({
          message: `Welcome ${user.username}! `,
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials, please try again' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get('/logout', (req, res) =>{
  if(req.session){
    req.session.destroy(error =>{
      if (error){
        res.status(500).json({message: 'Server error'})
      }else{
        res.send('See you soon!')
      }
    })
  }else{
    res.status(401).json({message: 'You need to be logged in before you can logout!'})
  }
})

module.exports = router;
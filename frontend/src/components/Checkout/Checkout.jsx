import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { succesOrderDone, clearCart } from '../../redux/slices/mainSlices';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const userId = useSelector((state) => state.main.userId);
  const orderInCart = useSelector((state) => state.main.cart);
  const succesOrderState = useSelector((state) => state.main.succesOrder);
  const [inputState, setInputState] = useState({
    name: "",
    email: "",
    street: "",
    house: "",
    apartment:"",
    comment:""
  });
  const { name, email, street,house,apartment,comment } = inputState;

  useEffect(() => {
    if(succesOrderState === true) {
      dispatch(clearCart({}))
    }
  },[succesOrderState])

  useEffect(() => {
      (async () => {
      const response = await fetch('/order', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          street,
          house,
          apartment,
          comment,
          date : new Date(),
          user_id: userId,
          order:  orderInCart
        }),
      })
    })();
  },[succesOrderState]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e) => {
    if(e.target.textContent === "Submit") {
      dispatch(succesOrderDone(true))
    }
    setOpen(false);
  };

  function handleChange({target: {name, value}}) {
    setInputState({ ...inputState, [name]: value });
  }

  return (
    <div>
      <Button style={{background: "#4520ab", color: "white", padding:"10px", fontWeight: "bold", marginBottom: "10px", marginRight : "10px"}} variant="outlined"  onClick={handleClickOpen}>
        Checkout
      </Button>
      <Dialog  open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Order</DialogTitle>
        <DialogContent >
          <TextField
            required
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            onChange={handleChange}
            autoComplete="off"
          />
          <TextField
            required
            autoFocus
            autoComplete="off"
            margin="dense"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            autoFocus
            autoComplete="off"
            margin="dense"
            name="street"
            label="Street"
            type="text"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            autoFocus
            autoComplete="off"
            margin="dense"
            name="house"
            label="House"
            type="text"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            autoFocus
            autoComplete="off"
            margin="dense"
            name="apartment"
            label="Apartment"
            type="text"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            autoFocus
            autoComplete="off"
            margin="dense"
            name="comment"
            label="Order comment"
            type="text"
            fullWidth
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


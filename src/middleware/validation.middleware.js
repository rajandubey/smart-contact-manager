const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const phoneRegex =
  /^[+0-9()\-\s]{7,20}$/;

export const validateContact = (req, res, next) => {
  const {
    full_name,
    phone_number,
    email
  } = req.body;

  if (!full_name || !full_name.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Full Name is required'
    });
  }

  if (!phone_number || !phoneRegex.test(phone_number)) {
    return res.status(400).json({
      success: false,
      message: 'Valid Phone Number is required'
    });
  }

  if (email && !emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid email address'
    });
  }

  next();
};
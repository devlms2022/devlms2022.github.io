import React from "react";
import Input from "../Input";
import { Styling as WrapContent } from "../Signup/index";

const FormAccount = (props) => {
  const { onChange, errors, data, disabled } = props;

  return (
    <WrapContent>
      <Input
        className="form-control"
        label="Email"
        disabled={disabled.email ? true : false}
        name="email"
        type="email"
        value={data.email ? data.email : ""}
        onChange={onChange}
        error={errors.email ? true : false}
        helperText={errors.email ? errors.email : " "}
      />
      <Input
        className="form-control"
        label="Old Password"
        name="old_password"
        type="password"
        onChange={onChange}
        error={errors.oldpassword ? true : false}
        helperText={errors.oldpassword ? errors.oldpassword : " "}
      />
      <Input
        className="form-control"
        label="New Password"
        name="new_password"
        type="password"
        onChange={onChange}
        error={errors.new_password ? true : false}
        helperText={errors.new_password ? errors.new_password : " "}
      />
      <Input
        className="form-control"
        label="Re-type New Password"
        name="renew_password"
        type="password"
        onChange={onChange}
        error={errors.renew_password ? true : false}
        helperText={errors.renew_password ? errors.renew_password : " "}
      />
    </WrapContent>
  );
};

export default FormAccount;

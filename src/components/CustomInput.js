import React, { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

export const CustomInput = ({
	label,
	type,
	onChange,
	required,
	value,
	name,
}) => {
	const [showPassword, setShowPassword] = useState(false);
	const passwordType = type === "password" && showPassword ? "text" : type;

	return (
		<div className="mb-3">
			<label className="form-label text-white">{label}</label>
			<div className="position-relative">
				<input
					type={passwordType}
					className="form-control pe-5" // pe-5 adds right padding to prevent text overlap
					onChange={onChange}
					required={required}
					value={value}
					name={name}
				/>
				{type === "password" && (
					<span
						className="position-absolute top-50 end-0 translate-middle-y me-3 text-gray-400 cursor-pointer"
						onClick={() => setShowPassword(!showPassword)}
					>
						{showPassword ? <BsEye /> : <BsEyeSlash />}
					</span>
				)}
			</div>
		</div>
	);
};

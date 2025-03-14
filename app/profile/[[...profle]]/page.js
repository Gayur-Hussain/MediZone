import { UserProfile } from "@clerk/nextjs";
import React from "react";

const ProfilePage = () => {
	return (
		<div className="mt-24 flex justify-center items-center">
			<UserProfile />
		</div>
	);
};

export default ProfilePage;

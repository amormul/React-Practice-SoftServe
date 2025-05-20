import React, {useEffect, useState} from "react";
import {Avatar, Button, ButtonGroup, Stack, TextField, Typography} from "@mui/material";

function EditProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "johndoe@example.com",
    bio: "",
    avatar: "",
  });

  useEffect(() => {
    // Simulate fetching data from profileData.json
    const fetchData = async () => {
      const response = await fetch('/src/data/profileData.json');
      const data = await response.json();
      setProfileData({
        name: data.user.username,
        email: "user@example.com", // Replace with actual email if available
        bio: data.user.bio,
        avatar: data.user.avatarUrl,
      });
    };

    fetchData();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setProfileData({...profileData, [name]: value});
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileData({...profileData, avatar: reader.result as string});
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Add save logic here (e.g., API call)
    setIsEditing(false);
  };

  return (
    <Stack spacing={3} maxWidth="30%">
      <Stack direction="row" spacing={2}>
        <Typography variant="h4" component="h2" gutterBottom>
          Personal Information
        </Typography>
      </Stack>
      <Stack spacing={2} direction="row" alignItems="center">
        <Avatar
          src={profileData.avatar}
          alt="Avatar"
          sx={{width: 130, height: 130}}
        />
        <Stack spacing={1}>
          {isEditing && (
            <>
              <Typography variant="caption" textAlign="left">Upload an image in JPG or PNG format with a max size of
                25MB.</Typography>
              <Button variant="outlined" component="label" size="small">
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleAvatarChange}
                />
              </Button>
            </>
          )}
        </Stack>
      </Stack>
      <Stack spacing={2} width="100%">
        <TextField
          label="Name"
          name="name"
          value={profileData.name}
          onChange={handleInputChange}
          disabled={!isEditing}
          fullWidth
        />
        <TextField
          label="Email"
          name="email"
          value={profileData.email}
          onChange={handleInputChange}
          disabled={!isEditing}
          fullWidth
        />
        <TextField
          label="Bio"
          name="bio"
          value={profileData.bio}
          onChange={handleInputChange}
          disabled={!isEditing}
          multiline
          rows={4}
          fullWidth
        />
        {isEditing ? (
          <ButtonGroup>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
            <Button variant="outlined" onClick={handleEditToggle}>
              Cancel
            </Button>
          </ButtonGroup>
        ) : (
          <Button variant="contained" onClick={handleEditToggle}>
            Edit
          </Button>
        )}
      </Stack>
    </Stack>
  );
}

export default EditProfile;
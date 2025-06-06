"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AppBar, Box, Button, Grid, Tab, Tabs, TextField } from "@mui/material";
import Link from "@mui/material/Link";
import { z } from "zod";
import path from "path";

interface formErrors {
  email?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const LoginPage = () => {
  const formSchema = z.object({
    email: z
      .string()
      .email("Invalid email format"),
    username: z.string().min(1, "*Username is Required..."),
    password: z.string().min(1, "*Password is Required..."),
    confirmPassword: z.string().min(1, "*Confirm Password is Required..."),
  });

  const [signUp, setSignUp] = useState<signUpPoprs>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [login, setLogin] = useState({
    username : "",
    password : "", 
  })

  interface signUpPoprs {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  }

  const [errors, setErrors] = useState<formErrors>({});
  const router = useRouter();
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mock login logic
    if (
      signUp.email === "admin@example.com" &&
      signUp.password === "password"
    ) {
      alert("Login successful!");
      router.push("/shop"); // Redirect to Shop page
    } else {
      alert("Invalid email or password");
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      formSchema.parse(signUp);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/members`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: signUp.email,
            username: signUp.username,
            password: signUp.password,
          }),
        }
      );
      if (res.ok) {
        alert("Sign up successful!");
      } else {
        alert("Sign up failed");
        throw new Error("Sign up failed");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = {};
        error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        console.log("Error signing up: ", error);
      }
      
    }
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <Box
          sx={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <AppBar position="static" color="transparent">
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                indicatorColor="secondary"
                textColor="inherit"
              >
                <Tab label="Login" {...a11yProps(0)} />
                <Tab label="Sign Up" {...a11yProps(1)} />
              </Tabs>
            </AppBar>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
              <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
              <form onSubmit={handleLogin}>
                <Grid container={true} spacing={2}>
                  <Grid size={12}>
                    <TextField
                      label="User Name"
                      size="small"
                      fullWidth={true}
                      slotProps={{
                        inputLabel: {
                          shrink: true,
                        },
                      }}
                    ></TextField>
                  </Grid>
                  <Grid size={12}>
                    <TextField
                      label="Password"
                      size="small"
                      fullWidth={true}
                      slotProps={{
                        inputLabel: {
                          shrink: true,
                        },
                      }}
                    ></TextField>
                  </Grid>
                  <Grid size={12}>
                    <Link href="#" underline="hover" className="text-blue-500">
                      Forget Password
                    </Link>
                  </Grid>
                  <Grid size={12}>
                    <Button
                      variant="contained"
                      size="small"
                      fullWidth={true}
                      type="submit"
                    >
                      Login
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
              <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
              <form onSubmit={handleSignUp}>
                <Grid container={true} spacing={2}>
                  <Grid size={12}>
                    <TextField
                      label="Email"
                      value={signUp.email}
                      onChange={(e) =>
                        setSignUp({ ...signUp, email: e.target.value })
                      }
                      size="small"
                      // type="email"
                      placeholder="Excample@gmail.com"
                      fullWidth={true}
                      slotProps={{
                        inputLabel: {
                          shrink: true,
                        },
                      }}
                      error={!!errors.email}
                      helperText={errors.email}
                    ></TextField>
                  </Grid>
                  <Grid size={12}>
                    <TextField
                      value={signUp.username}
                      onChange={(e) =>
                        setSignUp({ ...signUp, username: e.target.value })
                      }
                      label="User Name"
                      size="small"
                      placeholder="Enter username"
                      fullWidth={true}
                      slotProps={{
                        inputLabel: {
                          shrink: true,
                        },
                      }}
                      error={!!errors.username}
                      helperText={errors.username}
                    ></TextField>
                  </Grid>
                  <Grid size={12}>
                    <TextField
                      value={signUp.password}
                      onChange={(e) =>
                        setSignUp({ ...signUp, password: e.target.value })
                      }
                      label="Password"
                      size="small"
                      type="password"
                      placeholder="Enter password"
                      fullWidth={true}
                      slotProps={{
                        inputLabel: {
                          shrink: true,
                        },
                      }}
                      error={!!errors.password}
                      helperText={errors.password}
                    ></TextField>
                  </Grid>
                  <Grid size={12}>
                    <TextField
                      value={signUp.confirmPassword}
                      onChange={(e) =>
                        setSignUp({
                          ...signUp,
                          confirmPassword: e.target.value,
                        })
                      }
                      label="Comfirm Password"
                      size="small"
                      type="password"
                      placeholder="comfirm your password"
                      fullWidth={true}
                      slotProps={{
                        inputLabel: {
                          shrink: true,
                        },
                      }}
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword}
                    ></TextField>
                  </Grid>
                  <Grid size={12}>
                    <Button
                      variant="contained"
                      size="small"
                      fullWidth={true}
                      type="submit"
                    >
                      Sign Up
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </div>
          </CustomTabPanel>
        </Box>
      </div>
    </>
  );
};

export default LoginPage;

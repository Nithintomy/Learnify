import {
    Card,
    List,
    ListItem,
    ListItemPrefix,
   
  } from "@material-tailwind/react";
  import {
    PresentationChartBarIcon,
    UserCircleIcon,
    Cog6ToothIcon,
  
  } from "@heroicons/react/24/solid";
   
  export function DefaultSidebar() {
    return (
      <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 mt-2 shadow-xl shadow-blue-gray-900/5">
        
        <List>
          <ListItem>
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Dashboard
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
           Students
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Tutors
           
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Courses
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            Settings
          </ListItem>
          
        </List>
      </Card>
    );
  }
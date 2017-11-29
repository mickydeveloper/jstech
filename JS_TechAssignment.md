/*  Assignment: 

Create a simple Vue project with the follow requirements: 
    1. Onload, this site does two things concurrently:
        - pings API endpoint #1 for data to populate Recent Tab
        - pings API endpoint #2 for data to populate Settings Tab
     
        You can reuse the sample data provided as the dummy returned response from the respective API Endpoints. 
    
    2. Recent Tab Requirements: 
        -> Allow the user to cycle through the four states for the cards: 
            View Mode + Empty
            View Mode + Has Data
            Edit Mode Step 1 (where the user selects the dayType)
            Edit Mode Step 2 (where the user can flesh out the rest of the selections)
        -> The Settings Tab array is used to generate the treatment options for the cards:
            - If status of treatment is true OR treatment is selected for that day, it will show up in the short list of treatments 
            - Tapping on "Show All" displays all the treatment regardless of their status or selection state. 
        -> Post the data for the one day whenever the user taps on "Done"

    3. Setting Tab Requirements
        -> Post the data back to the server when the user makes any changes in the Settings Tab

    Use your preferred CSS library for the component styling. The colour or graphics don't need to match the demo videos. But it needs to look nice.

*/

// Sample response from API Endpoint #1. It returns an arary of objects used to populate Recent Tab. 

    RECENT_TAB_RESPONSE = [{
        date: 2017-11-24,       //YYYY-MM-DD format
        dayExists: true,       // Boolean. True if any data has been keyed in for the day. False if there is no data for that day. 
        dayType: 'Good',        // 3 Possible values: ‘Good’, ‘Okay’, ‘Mig’ or null
                                // if dayExists = false, this will be null
        activeLevel: 'Full',    // 3 Possible values: ‘Full’, ‘Half’, ‘None’
                                // How the user selection should be mapped to the data: 
                                //      "No Activities Affected" -> 'Full'
                                //      "Slowed Down" -> 'Half'
                                //      "Missed Actitivies" ->  'None'
        treatment: [ 'Sumatriptan', 'Topiramate'], // an array of string of treatment names. This represents the treatments selected for this day. 
        notes: ''
    },
    {
        date: 2017-11-23, 
        dayExists: true, 
        dayType: 'Good',
        activeLevel: 'Full', 
        treatment: ['Sumatriptan', 'Running'],
        notes: ''
    },
    {
        date: 2017-11-22, 
        dayExists: true, 
        dayType: 'Good',
        activeLevel: 'Full', 
        treatment: ['Sleeping', 'Lemon Tea'],
        notes: '' 
    },
    {
        date: 2017-11-21, 
        dayExists: true, 
        dayType: 'Good',
        activeLevel: 'Full', 
        treatment: ['Dark Room Rest'],
        notes: '' 
    },
    {
        date: 2017-11-20, 
        dayExists: true, 
        dayType: 'Good',
        activeLevel: 'Full', 
        treatment: [ ],
        notes: ''
    }
]

// Sample Response from API Endpoint #1. It returns an arary of objects used to populate Settings Tab. 

    SETTINGS_TAB_RESPONSE: [{
        name: 'Sumatriptan', // this is the name of the med or relief. names are unique, 
        customType: 'others',	// this affects the value selected in the dropdown. 4 Possible values: ‘others’, ‘preventative’, ‘relief’, ‘rescue’
        status: true		// this maps to the toggle. if it's true, it will be shown in the initial expansion. when users tap on "Show All", all treatments will be shown regardless of their status. 
    },
    {
        name: 'Topiramate', 
        customType: 'preventative',	
        status: true		
    },
    {
        name: 'Dark Room Rest', 
        customType: 'relief',	
        status: true		
    },
    {
        name: 'Lemon Tea', 
        customType: 'relief',	
        status: false
    },    
    {
        name: 'Sleeping', 
        customType: 'relief',	
        status: false
    },
    {
        name: 'Running', 
        customType: 'relief',	
        status: false
    }

];
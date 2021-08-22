console.log(localStorage.getItem('Current_user Uid'))
var a = localStorage.getItem('Current_user Uid')

console.log(a)

firebase.database().ref().child('Resturant').orderByChild('uid').equalTo(a).once('value').then((snap) => {
    var data = snap.toJSON();
    console.log("Not json", snap)
    console.log("JSON", data)



    if (data == null) {

        firebase.database().ref().child('user').orderByChild('uid').equalTo(a).once('value').then((snap) => {
            var data = snap.toJSON();

            const value = Object.values(data)

            console.log("user:", value[0].email)

            document.getElementById('email').innerText = value[0].email
            document.getElementById('name').innerText = value[0].Name
            document.getElementById('user-id').innerText = value[0].uid;


            // firebase.database().ref('Resturant').once('value')
            //     .then((data) => {
            //         var js = data.toJSON()
            //         console.log(js)
            //     })
            //     .catch((err) => {
            //         console.log(err)
            //     })

            firebase.database().ref('Resturant').once('value', (snapshot) => {

                    const data11 = snapshot.toJSON()
                    const value = Object.values(data11)
                    console.log('res', value);
                    var res_val = document.getElementById('res-val');
                    var res_id = document.getElementById('res-id');
                    var container = document.getElementById("container-val");
                    container.innerHTML = `<h3 class="res-heading">Available Restaraunts</h3>`
                    for (let i = 0; i < value.length; i++) {
                        container.innerHTML += `<h3 class="box">${value[i].Name}</h3>`;
                        container.innerHTML += `<h5 class="box">${value[i].uid}</h5>`;
                        // container.innerHTML = `<h3 class="box">${value[i].uid}</h3>`;
                    }
                    // res_val.innerHTML = value[0].Name;
                    // res_id.innerHTML = value[0].uid;
                })
                // var ref = firebase.database().ref('Resturant');
                // ref.on("value", function(snapshot) {
                //     console.log("res", snapshot.toJSON())
                //     var res_values = snapshot.val();
                //     console.log('res val', res_values)
                // var res_val = document.getElementById('res-val');
                // var res_id = document.getElementById('res-id');
                // res_val.innerHTML = res_values[0].Name;
                // res_id.innerHTML = res_values[0].uid;
                // }, function(error) {
                //     console.log("Error: " + error.code);
                // });


        })

    } else {

        // const key = Object.keys(data)
        // console.log(key)
        const value = Object.values(data)
        console.log(value)

        console.log("Resturant:", value[0].email)

        document.getElementById('email').innerText = value[0].email
        document.getElementById('name').innerText = value[0].Name

        var user_data = []

        var data = document.getElementById("user_data")


        firebase.database().ref('user').once('value', (snapshot) => {

            const data11 = snapshot.toJSON()
            const value = Object.values(data11)

            value.forEach(v =>

                user_data.push(v)
            )

            user_data.map((v, i) => {
                console.log("user No :", i)
                console.log("user Value :", v)
                var ref = firebase.database().ref();

                ref.on("value", function(snapshot) {
                    console.log(snapshot.val());
                }, function(error) {
                    console.log("Error: " + error.code);
                });
                // var res_val = document.getElementById('res-val');
                // var res_id = document.getElementById('res-id');
                // res_val.innerHTML = value[0].Name;
                // res_id.innerHTML = value[0].uid;
                var container = document.getElementById("container-val");
                container.innerHTML = `<h3 class="res-heading">These are the registered Users</h3>`
                for (let i = 0; i < value.length; i++) {
                    container.innerHTML += `<h3 class="box">${value[i].Name}</h3>`;
                    container.innerHTML += `<h5 class="box"${value[i].email}</h5>`;
                    // container.innerHTML = `<h3 class="box">${value[i].uid}</h3>`;
                }

                // var ele1 = document.createElement('h1')
                // var text = document.createTextNode(`user Name :${v.Name}`)
                // ele1.appendChild(text)
                // var ele2 = document.createElement('h3')
                // var text2 = document.createTextNode(`user Email :${v.email}`)
                // ele2.appendChild(text2)
                // data.appendChild(ele1)
                // data.appendChild(ele2)

            })


        })

    }

})
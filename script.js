function showData(){
	const airportcode = document.getElementById("airportcode").value.toUpperCase();
	const fetchLink = 'https://api.flightapi.io/compschedule/675c28b2ac6016bffe232601?mode=arrivals&day=1&iata=' + airportcode;
	fetch(fetchLink)
		.then((data) => {
			return data.json();
			}).then((objectData) => {
				console.log(objectData);
				const countries=[];
				objectData.map((items) => {
					items.airport.pluginData.schedule.arrivals.data.map((item) => {
						countries.push(item.flight.airport.origin.position.country.name);
						});
				});
				//console.log(countries);
				var country = countries.reduce(function(prev, cur) {
					prev[cur] = (prev[cur] || 0) + 1;
					return prev;	
				}, {});
				//console.log(country);
				let tableData="";
				for(var propt in country){
					tableData += '<tr><td>' + propt + '</td><td>' + country[propt] + '</td></tr>';
				}
				document.getElementById("table_body").innerHTML = tableData;
			})
		.catch(error => console.error(error));
}
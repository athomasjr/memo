import { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import GoogleFontLoader from 'react-google-font-loader'
import MainLayout from './hoc/mainLayout'
import Home from './components/home'
import Header from './components/navigation/header'

export default function Routes() {
	const [loading, setLoading] = useState(true)
	return (
		<Router>
			<Header />
			<MainLayout>
				<Switch>
					<Route exact path='/' component={Home} />
				</Switch>
			</MainLayout>
			<GoogleFontLoader
				fonts={[
					{ font: 'Roboto', weights: [300, 400, 900] },
					{ font: 'Fredoka One' },
				]}
			/>
		</Router>
	)
}

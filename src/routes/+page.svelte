<svelte:head>
	<title>Payto:// — The Payto money URI generator</title>
	<meta name="description" content="The Payto money URI scheme generator." />
	<meta property="twitter:title" content="Payto:// — The Payto money URI generator" />
	<meta property="twitter:description" content="The Payto URI scheme generator." />
	<meta property="twitter:image" content="https://Payto.money/icons/android-chrome-512x512.png" />
	<meta property="og:title" content="Payto:// — The Payto money URI generator" />
	<meta property="og:description" content="The Payto money URI scheme generator." />
	<meta property="og:image" content="https://Payto.money/icons/android-chrome-512x512.png" />
</svelte:head>

<script>
	import types from '$lib/data/types.json';
	import transport from '$lib/data/transports.json';
	import dest from '$lib/data/destinations.json';
	import { page } from '$app/stores';
	import Radio from '$lib/Radio.svelte';
	import Select from '$lib/Select.svelte';

	let typeValue = types[0].value;
	let typeName = types[0].label;
	let transportValue = transport[typeValue][0].value;
	let property = `${types[0].value}:`;
	let host = ``;
	let pointer = [];
	let network = ``;
	let destination = ``;
	let currency = ``;
	let amount = ``;
	let message = ``;
	let receiverName = ``;
	let note = ``;

	function url(protocol = 'payto', hostname = '', path = [], query) {
		let qu = '';
		let pa = '';
		for (let i = 0; i < path.length; i++) {
			if (path[i] && i === path.length-1) {
				pa = pa + encodeURIComponent(path[i]);
			} else if (path[i]) {
				pa = pa + encodeURIComponent(path[i]) + '/';
			}
		}
		if (typeof query === 'object' && !Array.isArray(query) && query !== null) {
			let rq = [];
			for (let q in query) {
				if(query[q]) {
					rq.push(encodeURIComponent(q) + '=' + encodeURIComponent(query[q]));
				}
			}
			if(rq.length>0) {
				qu = '?' + rq.join('&');
			}
		}
		let url = protocol + '://' + encodeURIComponent(hostname) + '/' + pa + qu;
		return url;
	}

	function txtContent(data) {
		let txre = '';
		let txrt = [];
		for (let q in data) {
			if(data[q]) {
				txrt.push(encodeURIComponent(q) + '=' + encodeURIComponent(data[q]));
			}
		}
		if(txrt.length>0) {
			txre = txrt.join(';') + ';';
		}
		return txre;
	}

	function handleSubmit() {
		alert(`ok`);
	}

	$: if (typeValue === 'ican') {
		pointer = [destination];
		if (transportValue) {
			if (currency) {
				property = `ican:${network}:${currency.toLowerCase()}`;
				host = network;
				note = `on ${network.toUpperCase()} with ${currency.toUpperCase()}`;
			} else {
				property = `ican:${network}`;
				host = `${network}`;
				note = `with ${network.toUpperCase()}`;
			}
		} else {
			property = `ican`;
			host = `ican`;
		}
	} else if (typeValue === 'iban') {
		if (transportValue) {
			host = `iban`;
			pointer = [network, destination];
			if (currency) {
				property = `iban:${network}:${currency.toLowerCase()}`;
				note = `on IBAN with ${currency.toUpperCase()}`;
			} else {
				property = `iban:${network}`;
				note = `with IBAN`;
			}
		} else {
			pointer = [destination];
			property = `iban`;
			host = `iban`;
		}
	} else if (typeValue === 'void') {
		property = typeValue;
		host = typeValue;
		note = `with CASH`;
	} else {
		property = typeValue;
		host = typeValue;
		note = `with ${typeValue.toUpperCase()}`;
	}

	$: if (transportValue === 'other' || transportValue === 'none') {
		network = '';
	} else {
		network = transportValue;
	}

	$: transports = transport[typeValue];
	$: destName = dest[typeValue].name;
	$: destPlaceholder = dest[typeValue].placeholder;

	$: link = url('payto', host, pointer);
	$: name = `Pay ${note}`;
	$: donateName = `Donate ${note}`;
	$: markdown = `[${name}](${link})`;
	$: htmlLink = `<a href="${link}">${name}</a>`;
	$: paymentButton = `<a href="${link}" style="display:inline-block;background-color:#74ae51;color:#f2fbec;text-decoration:none;padding:.5em 1.3em .5em .7em;border:3px #95c678 solid;border-left: 10px #95c678 solid;border-radius:4px 9999px 9999px 4px;font-family:BlinkMacSystemFont,-apple-system,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Fira Sans','Droid Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">💸&#8192;${name}</a>`;
	$: donationButton = `<a href="${link}" style="display:inline-block;background-color:#b99e4f;color:#f2fbec;text-decoration:none;padding:.5em 1.3em .5em .7em;border:3px #e6c565 solid;border-left: 10px #e6c565 solid;border-radius:4px 9999px 9999px 4px;font-family:BlinkMacSystemFont,-apple-system,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Fira Sans','Droid Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">🎁&#8192;${donateName}</a>`;
	$: metaTag = `<meta property="${property}" content="${destination}" />`;
	$: txtRecord = txtContent();
</script>

<div class="container">
	<div class="box">
		<form on:submit|preventDefault={handleSubmit}>
			<h2 class="is-size-3">Payment constructor</h2>
			<div class="field">
				<div class="label">Type</div>
				<Radio {types} bind:typeSelected={typeValue}/>
			</div>

			<div class="field">
				<label class="label" for="network">Transport network</label>
				<div class="field has-addons">
					<div class="control has-icons-left">
						<Select {transports} bind:transportSelected={transportValue}/>
						<span class="icon is-left">
							<em class="oji">⛓️</em>
						</span>
					</div>
					<div class="control has-icons-right is-fullwidth">
						<input id="network" bind:value={network} class="input is-rounded is-uppercase" type="text" placeholder={transportValue} disabled={(typeValue === 'ican' && transportValue !== 'other')} />
						<span class="icon is-right"><em class="oji grayscale">✅</em></span>
					</div>
				</div>
			</div>

			<div class="field">
				<label class="label" for="destination">{destName}</label>
				<div class="control has-icons-right">
					<input id="destination" bind:value={destination} class="input is-rounded" type="text" placeholder={destPlaceholder} />
					<span class="icon is-right"><em class="oji grayscale">✅</em></span>
				</div>
			</div>

			{#if (typeValue === 'iban') || (typeValue === 'upi') || (typeValue === 'void')}
			<div class="field">
				<label class="label" for="destination">Receiver name</label>
				<div class="control">
					<input id="receiver-name" bind:value={receiverName} class="input is-rounded" type="text" placeholder="Receiver name" />
				</div>
			</div>
			{/if}

			{#if (typeValue === 'iban') || (typeValue === 'upi') || (typeValue === 'void')}
			<div class="field">
				<label class="label" for="destination">Message</label>
				<div class="control">
					<input id="message" bind:value={message} class="input is-rounded" type="text" placeholder="Message for recipient" />
				</div>
			</div>
			{/if}

			<div class="columns">

				<div class="column">
					<div class="field">
						<label class="label" for="currency">Currency / Token</label>
						<div class="control">
							<input id="currency" bind:value={currency} class="input is-rounded is-uppercase" type="text" placeholder="Currency" />
						</div>
						<p class="help">Empty value uses the network currency.</p>
					</div>
				</div>

				<div class="column is-four-fifths">
					<div class="field">
						<label class="label" for="amount">Amount</label>
						<div class="control has-icons-right">
							<input id="amount" bind:value={amount} class="input is-rounded" type="number" inputmode="numeric" placeholder="0.00" step="0.01" pattern="\d*\.*" />
							<span class="icon is-right"><em class="oji grayscale">✅</em></span>
						</div>
					</div>
				</div>

			</div>

			<button type="submit" class="button is-link is-primary">Copy link</button>
			<!--label for="pay" class="button is-link is-warning">Switch to payment</label-->
			<button type="reset" class="button is-light is-danger">Clear data</button>
		</form>
	</div>
</div>

<div class="container">
	<div class="box">
		<h2 class="is-size-3">Payto integrations</h2>

		<div class="field">
			<label class="label" for="result-link">Link</label>
			<div class="field has-addons">
				<div class="control">
					<button class="button">📋 Copy</button>
				</div>
				<div class="control is-fullwidth">
					<input id="result-link" class="input is-rounded" type="text" value={link} readonly />
				</div>
			</div>
		</div>

		<div class="field">
			<label class="label" for="result-markdown">Markdown</label>
			<div class="field has-addons">
				<div class="control">
					<button class="button">📋 Copy</button>
				</div>
				<div class="control is-fullwidth">
					<input id="result-markdown" class="input is-rounded" type="text" value={markdown} readonly />
				</div>
			</div>
		</div>

		<div class="field">
			<label class="label" for="result-html">HTML link</label>
			<div class="field has-addons">
				<div class="control">
					<button class="button">📋 Copy</button>
				</div>
				<div class="control is-fullwidth">
					<input id="result-html" class="input is-rounded" type="text" value={htmlLink} readonly />
				</div>
			</div>
		</div>

		<div class="field">
			<label class="label" for="result-meta">Payment button — HTML</label>
			<div class="field has-addons">
				<div class="control">
					<button class="button">📋 Copy</button>
				</div>
				<div class="control is-fullwidth">
					<input id="result-meta" class="input is-rounded" type="text" value={paymentButton} readonly />
				</div>
			</div>
		</div>
		<div class="block preview">
			<div class="is-size-7 is-uppercase">Preview</div>
			<div>{@html paymentButton}</div>
		</div>

		<div class="field">
			<label class="label" for="result-meta">Donation button — HTML</label>
			<div class="field has-addons">
				<div class="control">
					<button class="button">📋 Copy</button>
				</div>
				<div class="control is-fullwidth">
					<input id="result-meta" class="input is-rounded" type="text" value={donationButton} readonly />
				</div>
			</div>
		</div>
		<div class="block preview">
			<div class="is-size-7 is-uppercase">Preview</div>
			<div>{@html donationButton}</div>
		</div>

		<div class="field">
			<label class="label" for="result-meta">Meta tag</label>
			<div class="field has-addons">
				<div class="control">
					<button class="button">📋 Copy</button>
				</div>
				<div class="control is-fullwidth">
					<input id="result-meta" class="input is-rounded" type="text" value={metaTag} readonly />
				</div>
			</div>
		</div>

		<hr />

		<h6 class="has-text-weight-bold">TXT record</h6>

		<div class="field">
			<label class="label has-text-weight-normal" for="result-meta">Name</label>
			<div class="field has-addons">
				<div class="control">
					<button class="button">📋 Copy</button>
				</div>
				<div class="control is-fullwidth">
					<input id="result-meta" class="input is-rounded" type="text" value="payto" readonly />
				</div>
			</div>
		</div>
		<div class="field">
			<label class="label has-text-weight-normal" for="result-meta">Content</label>
			<div class="field has-addons">
				<div class="control">
					<button class="button">📋 Copy</button>
				</div>
				<div class="control is-fullwidth">
					<input id="result-meta" class="input is-rounded" type="text" value={txtRecord} readonly />
				</div>
			</div>
		</div>

	</div>
</div>

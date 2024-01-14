export const TEMPLATE = `<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hey {{first_name}}, vielen Dank für deine Bestellung!</title>
    
    <style>
    body {
        font-family: Arial, Helvetica, sans-serif;
    }

    table {
        border-collapse: collapse;
        width: 100%;
    }

    th,
    td {
        padding: 8px;
        text-align: left;
        border-bottom: 1px solid #ddd;
    }

    tr:hover {
        background-color: #f5f5f5;
    }

    
</style>
</head>

<body>
    <h1>Hey {{first_name}} {{last_name}},</h1>
    <p>Vielen Dank für deine Bestellung! Wir freuen uns sehr, dir bestätigen zu können, dass dein Kauf erfolgreich war.</p>

    <h2>Bestellbestätigung:</h2>
    <table>
        <tr>
            <th>Item</th>
            <th>Menge</th>
            <th>Preis</th>
        </tr>
        {{#each items}}
        <tr>
            <td>{{title}}</td>
            <td>{{quantity}}</td>
            <td>{{convert_to_eur total}}</td>
        </tr>
        {{/each}}
    </table>

    <p>Endbetrag inkl. USt.: {{convert_to_eur total}}</p>

    <h2>Versandart:</h2>
    <p>{{shipping_option}}</p>

    <h2>Versandadresse:</h2>
    <p>{{shipping_address.first_name}} {{shipping_address.last_name}}</p>
    <p>{{shipping_address.address_1}}</p>
    <p>{{shipping_address.province}} {{shipping_address.postal_code}} {{shipping_address.city}}</p>
    <p>{{shipping_address.country}}</p>

    <h3>Bestellung #:</h3>
    <p>{{id}}</p>

    <p>Wir werden deine Bestellung bearbeiten und dich über den Stand der Bearbeitung informieren. Wenn du irgendwelche Fragen oder Bedenken hast,
        kannst du gerne auf diese E-Mail antworten.</p>

    <p>Liebe Grüße,</p>
    <p>Zenit</p>

    <div style="display:flex; flex-direction:column; align-items:center;">
    <p style="font-size:10px; margin-right:5px;"><a href="https://e-commerce-thb-app-production.up.railway.app">Zur Website</a></p>
    <p style="font-size:10px; margin-right:5px;"><a href="https://e-commerce-thb-app-production.up.railway.app/imprint">Impressum</a></p>
    <p style="font-size:10px; margin-right:5px;"><a href="https://e-commerce-thb-app-production.up.railway.app/privacy-policy">Datenschutz</a></p>
    <p style="font-size:10px;"><a href="https://e-commerce-thb-app-production.up.railway.app/terms-and-conditions">Allgemeine Geschäftsbedingungen</a></p>
    </div>

</body>
</html>` as const;

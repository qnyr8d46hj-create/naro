import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface EmailData {
  name: string
  email: string
  recipient: string
  occasion: string
  age: number
  budget: number
  deliveryDate: string
  description: string
  requestId: string
}

export async function sendAdminEmail(data: EmailData): Promise<void> {
  const adminEmail = process.env.ADMIN_EMAIL
  if (!adminEmail) throw new Error('ADMIN_EMAIL not configured')

  const budgetDisplay = data.budget >= 1000 ? '1000€+' : `${data.budget}€`

  await resend.emails.send({
    from: 'Naro <obavijesti@naro.hr>',
    to: adminEmail,
    subject: `🎁 Novi zahtjev — ${data.occasion} za ${data.recipient}`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1C1714;">
        <div style="border-bottom: 2px solid #B8714E; padding-bottom: 24px; margin-bottom: 32px;">
          <h1 style="font-size: 28px; margin: 0; color: #1C1714;">Novi Naro zahtjev</h1>
          <p style="color: #9C8E83; margin: 8px 0 0;">ID: ${data.requestId}</p>
        </div>

        <table style="width: 100%; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid #E2D9CE;">
            <td style="padding: 12px 0; color: #9C8E83; font-size: 14px; width: 40%;">Podnositelj</td>
            <td style="padding: 12px 0; font-weight: bold;">${data.name} &lt;${data.email}&gt;</td>
          </tr>
          <tr style="border-bottom: 1px solid #E2D9CE;">
            <td style="padding: 12px 0; color: #9C8E83; font-size: 14px;">Iznenaditi</td>
            <td style="padding: 12px 0;">${data.recipient}</td>
          </tr>
          <tr style="border-bottom: 1px solid #E2D9CE;">
            <td style="padding: 12px 0; color: #9C8E83; font-size: 14px;">Prigoda</td>
            <td style="padding: 12px 0;">${data.occasion}</td>
          </tr>
          <tr style="border-bottom: 1px solid #E2D9CE;">
            <td style="padding: 12px 0; color: #9C8E83; font-size: 14px;">Dob</td>
            <td style="padding: 12px 0;">${data.age} godina</td>
          </tr>
          <tr style="border-bottom: 1px solid #E2D9CE;">
            <td style="padding: 12px 0; color: #9C8E83; font-size: 14px;">Budžet</td>
            <td style="padding: 12px 0; color: #B8714E; font-weight: bold;">${budgetDisplay}</td>
          </tr>
          <tr style="border-bottom: 1px solid #E2D9CE;">
            <td style="padding: 12px 0; color: #9C8E83; font-size: 14px;">Datum</td>
            <td style="padding: 12px 0;">${data.deliveryDate}</td>
          </tr>
        </table>

        <div style="margin-top: 32px;">
          <p style="color: #9C8E83; font-size: 14px; margin-bottom: 8px;">Opis osobe:</p>
          <div style="background: #FAFAF7; border: 1px solid #E2D9CE; border-radius: 8px; padding: 20px; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${data.description}</div>
        </div>

        <div style="margin-top: 32px; padding: 20px; background: #B8714E; border-radius: 8px; text-align: center;">
          <p style="color: white; margin: 0; font-size: 16px;">Odgovori unutar <strong>24–48 sati</strong></p>
        </div>
      </div>
    `,
  })
}

export async function sendUserConfirmationEmail(data: Pick<EmailData, 'name' | 'email'>): Promise<void> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://naro.hr'

  await resend.emails.send({
    from: 'Naro <info@naro.hr>',
    to: data.email,
    subject: 'Primili smo vaš zahtjev — već razmišljamo ✨',
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1C1714; background: #FAFAF7; padding: 48px 40px;">
        <div style="text-align: center; margin-bottom: 48px;">
          <h1 style="font-size: 32px; margin: 0; letter-spacing: -0.5px;">Naro</h1>
        </div>

        <h2 style="font-size: 26px; font-weight: normal; line-height: 1.4; margin-bottom: 24px;">
          Dragi/a ${data.name},<br>
          primili smo vaš zahtjev.
        </h2>

        <p style="font-size: 16px; line-height: 1.8; color: #4A3F38; margin-bottom: 24px;">
          Pažljivo ćemo proučiti sve što ste nam povjerili i poslati vam tri potpuno personalizirana scenarija iznenađenja.
        </p>

        <div style="border-left: 3px solid #B8714E; padding-left: 20px; margin: 32px 0;">
          <p style="font-size: 15px; color: #6B5347; margin: 0; font-style: italic; line-height: 1.7;">
            "Ne tražimo što možemo poslati.<br>Tražimo što će joj ostati u srcu."
          </p>
        </div>

        <p style="font-size: 16px; line-height: 1.8; color: #4A3F38; margin-bottom: 8px;">
          Prijedloge možete očekivati unutar <strong>24 do 48 sati</strong>.
        </p>
        <p style="font-size: 14px; color: #9C8E83; margin-bottom: 40px;">
          Ako imate pitanja ili datum iznenađenja hitno dolazi, pišite nam na info@naro.hr.
        </p>

        <div style="border-top: 1px solid #E2D9CE; padding-top: 32px; text-align: center;">
          <p style="font-size: 13px; color: #9C8E83; margin: 0;">
            © 2025 Naro · <a href="${siteUrl}" style="color: #B8714E; text-decoration: none;">naro.hr</a>
          </p>
        </div>
      </div>
    `,
  })
}

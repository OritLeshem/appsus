const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { MailList } from "../cmps/mail-list.jsx";

import { mailService } from '../services/mail.service.js'
import { MailCompose } from "../cmps/mail-compose.jsx";

// import { eventBusService, showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'


export function MailIndex() {
    const [isLoading, setIsLoading] = useState(false)
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [mails, setMails] = useState([])
    const [isSendMail, setSendMail] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        loadMails()
    }, [filterBy])

    useEffect(() => {
        loadMails()
    }, [])

    function onSetFilter(filterByFromFilter) {
        setFilterBy(filterByFromFilter)
    }

    function loadMails() {
        mailService.query(filterBy).then(mailsToUpdate => {
            setMails(mailsToUpdate)
            setIsLoading(false)
        })
    }

    function onRemoveMail(mailId) {
        mailService.remove(mailId).then(() => {
            const updatedMails = mails.filter(mail => mail.id !== mailId)
            setMails(updatedMails)
            // showSuccessMsg('Mail removed')
        })
            .catch((err) => {
                console.log('Had issues removing', err)
                // showErrorMsg('Could not remove book, try again please!')
            })
    }


    // return <div>mail app main page</div>

    return <section className="mail-index">
        <div>
            {/* <MailFilter onSetFilter={onSetFilter} /> */}
            {/* <Link to="/mail/compose"><button>Send Mail</button></Link> */}

            {!isLoading && <MailList mails={mails} onRemoveMail={onRemoveMail} />}
            {isLoading && <div>Loading...</div>}
            {!mails.length && <div>No mails to show...</div>}
            {!isSendMail && <button className="send-btn" onClick={() => { setSendMail(!isSendMail) }}>SendMail</button>}
            {isSendMail && <MailCompose onSetSendMail={setSendMail} onSetMails={loadMails} />}
        </div>
    </section>



}


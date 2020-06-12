const express = require("express");

const Invites = require("./inviteModel.js");

const router = express.Router();

// 1. Fetch invitation code
router.get("/:code", (req, res) => {
  /* 

	:code		invitiation code (team_invite_link.link)

	checks if provided invite code isValid and good.
	
	 */

  const { code } = req.params;
  Invites.findByCode(code)
    .then((invite) => {
      const expires = Date.parse(invite.expires_at);

      if (expires < Date.now()) {
        clg("EXPIRED");
        res.status(403).json({ message: "Code is EXPIRED", team_id: -2 });
      } else if (invite.isValid === false) {
        clg("INVALID");
        res.status(406).json({ message: "Code is INVALID", team_id: -1 });
      } else {
        res
          .status(200)
          .json({
            team_id: invite.team_id,
            organization_id: invite.organization_id,
          });
      }
    })
    .catch((err) =>
      res
        .status(500)
        .json({ message: `Could not find invite code ${code}.`, error: err })
    );
});

module.exports = router;

function clg(...x) {
  console.log(...x);
}
